// gen-config 从 Oryn 源码解析配置结构体，输出每个 YAML 键的路径、Go 类型与字段注释。
//
// 用法：go run ./tools/gen-config -src ../Oryn -out reference-data/config.json
//
// 只用 Go 的 AST 才能连同字段注释完整解析这些结构体，因此独立成一个 Go 工具。
package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"go/ast"
	"go/parser"
	"go/token"
	"os"
	"path/filepath"
	"reflect"
	"strings"
)

// Field 是一个 YAML 键。Object 为 true 的键是嵌套结构体本身，其值由子键给出。
type Field struct {
	Path   string `json:"path"`
	GoType string `json:"goType"`
	Object bool   `json:"object"`
	Doc    string `json:"doc"`
	GoName string `json:"goName"`
}

// pkg 是一个包内全部具名结构体。
type pkg map[string]*ast.StructType

func main() {
	src := flag.String("src", "../Oryn", "Oryn 仓库根目录")
	out := flag.String("out", "reference-data/config.json", "输出文件")
	flag.Parse()

	cfg, err := load(filepath.Join(*src, "internal/config"), nil)
	if err != nil {
		fail(err)
	}
	pgw, err := load(filepath.Join(*src, "internal/pushgw"), []string{"config.go"})
	if err != nil {
		fail(err)
	}

	result := map[string][]Field{
		"orynd":       expand(cfg, "Orynd"),
		"provider":    expand(cfg, "Provider"),
		"pushGateway": expand(pgw, "Config"),
	}
	data, err := json.MarshalIndent(result, "", "  ")
	if err != nil {
		fail(err)
	}
	if err := os.WriteFile(*out, append(data, '\n'), 0o644); err != nil {
		fail(err)
	}
}

func fail(err error) {
	fmt.Fprintln(os.Stderr, "gen-config:", err)
	os.Exit(1)
}

// load 解析目录下的非测试 Go 文件；only 非空时只解析其中列出的文件。
func load(dir string, only []string) (pkg, error) {
	entries, err := os.ReadDir(dir)
	if err != nil {
		return nil, err
	}
	fset := token.NewFileSet()
	p := pkg{}
	for _, e := range entries {
		name := e.Name()
		if !strings.HasSuffix(name, ".go") || strings.HasSuffix(name, "_test.go") {
			continue
		}
		if only != nil && !contains(only, name) {
			continue
		}
		f, err := parser.ParseFile(fset, filepath.Join(dir, name), nil, parser.ParseComments)
		if err != nil {
			return nil, err
		}
		for _, decl := range f.Decls {
			gd, ok := decl.(*ast.GenDecl)
			if !ok || gd.Tok != token.TYPE {
				continue
			}
			for _, spec := range gd.Specs {
				ts := spec.(*ast.TypeSpec)
				if st, ok := ts.Type.(*ast.StructType); ok {
					p[ts.Name.Name] = st
				}
			}
		}
	}
	return p, nil
}

func contains(list []string, s string) bool {
	for _, v := range list {
		if v == s {
			return true
		}
	}
	return false
}

func expand(p pkg, root string) []Field {
	st, ok := p[root]
	if !ok {
		fail(fmt.Errorf("找不到结构体 %s", root))
	}
	var out []Field
	walk(p, st, "", &out)
	return out
}

func walk(p pkg, st *ast.StructType, prefix string, out *[]Field) {
	for _, f := range st.Fields.List {
		key := yamlKey(f)
		if key == "" || len(f.Names) == 0 {
			continue
		}
		path := key
		if prefix != "" {
			path = prefix + "." + key
		}
		field := Field{Path: path, GoType: typeString(f.Type), Doc: doc(f), GoName: f.Names[0].Name}
		idx := len(*out)
		*out = append(*out, field)

		switch t := deref(f.Type).(type) {
		case *ast.Ident:
			if inner, ok := p[t.Name]; ok {
				(*out)[idx].Object = true
				walk(p, inner, path, out)
			}
		case *ast.MapType:
			if v, ok := deref(t.Value).(*ast.Ident); ok {
				if inner, ok := p[v.Name]; ok {
					walk(p, inner, path+".<名称>", out)
				}
			}
		}
	}
}

func deref(e ast.Expr) ast.Expr {
	if s, ok := e.(*ast.StarExpr); ok {
		return s.X
	}
	return e
}

func yamlKey(f *ast.Field) string {
	if f.Tag == nil {
		return ""
	}
	tag := reflect.StructTag(strings.Trim(f.Tag.Value, "`")).Get("yaml")
	name := strings.Split(tag, ",")[0]
	if name == "-" {
		return ""
	}
	return name
}

func typeString(e ast.Expr) string {
	switch t := e.(type) {
	case *ast.Ident:
		return t.Name
	case *ast.StarExpr:
		return "*" + typeString(t.X)
	case *ast.ArrayType:
		return "[]" + typeString(t.Elt)
	case *ast.MapType:
		return "map[" + typeString(t.Key) + "]" + typeString(t.Value)
	case *ast.SelectorExpr:
		return typeString(t.X) + "." + t.Sel.Name
	default:
		return fmt.Sprintf("%T", e)
	}
}

// doc 返回字段注释原文。多行注释合并为一行：中文行尾直接相接，其余以空格相接。
func doc(f *ast.Field) string {
	var lines []string
	for _, g := range []*ast.CommentGroup{f.Doc, f.Comment} {
		if g == nil {
			continue
		}
		for _, l := range strings.Split(g.Text(), "\n") {
			if l = strings.TrimSpace(l); l != "" {
				lines = append(lines, l)
			}
		}
	}
	var b strings.Builder
	for i, l := range lines {
		if i > 0 {
			prev := []rune(lines[i-1])
			if prev[len(prev)-1] < 0x80 || []rune(l)[0] < 0x80 {
				b.WriteByte(' ')
			}
		}
		b.WriteString(l)
	}
	return b.String()
}
