---
title: "oryn completion"
description: "Generate the autocompletion script for oryn for the specified shell."
type: reference
generated: true
sidebar:
  order: 10
---

<!-- 由 scripts/gen-cli.ts 生成，勿手改；手写说明放 reference-data/cli-notes/ -->

## oryn completion

```text
Generate the autocompletion script for oryn for the specified shell.
See each sub-command's help for details on how to use the generated script.

Usage:
  oryn completion [command]

Available Commands:
  bash        Generate the autocompletion script for bash
  fish        Generate the autocompletion script for fish
  powershell  Generate the autocompletion script for powershell
  zsh         Generate the autocompletion script for zsh

Flags:
  -h, --help   help for completion

Use "oryn completion [command] --help" for more information about a command.
```

## oryn completion bash

```text
Generate the autocompletion script for the bash shell.

This script depends on the 'bash-completion' package.
If it is not installed already, you can install it via your OS's package manager.

To load completions in your current shell session:

	source <(oryn completion bash)

To load completions for every new session, execute once:

#### Linux:

	oryn completion bash > /etc/bash_completion.d/oryn

#### macOS:

	oryn completion bash > $(brew --prefix)/etc/bash_completion.d/oryn

You will need to start a new shell for this setup to take effect.

Usage:
  oryn completion bash

Flags:
  -h, --help              help for bash
      --no-descriptions   disable completion descriptions
```

## oryn completion fish

```text
Generate the autocompletion script for the fish shell.

To load completions in your current shell session:

	oryn completion fish | source

To load completions for every new session, execute once:

	oryn completion fish > ~/.config/fish/completions/oryn.fish

You will need to start a new shell for this setup to take effect.

Usage:
  oryn completion fish [flags]

Flags:
  -h, --help              help for fish
      --no-descriptions   disable completion descriptions
```

## oryn completion powershell

```text
Generate the autocompletion script for powershell.

To load completions in your current shell session:

	oryn completion powershell | Out-String | Invoke-Expression

To load completions for every new session, add the output of the above command
to your powershell profile.

Usage:
  oryn completion powershell [flags]

Flags:
  -h, --help              help for powershell
      --no-descriptions   disable completion descriptions
```

## oryn completion zsh

```text
Generate the autocompletion script for the zsh shell.

If shell completion is not already enabled in your environment you will need
to enable it.  You can execute the following once:

	echo "autoload -U compinit; compinit" >> ~/.zshrc

To load completions in your current shell session:

	source <(oryn completion zsh)

To load completions for every new session, execute once:

#### Linux:

	oryn completion zsh > "${fpath[1]}/_oryn"

#### macOS:

	oryn completion zsh > $(brew --prefix)/share/zsh/site-functions/_oryn

You will need to start a new shell for this setup to take effect.

Usage:
  oryn completion zsh [flags]

Flags:
  -h, --help              help for zsh
      --no-descriptions   disable completion descriptions
```
