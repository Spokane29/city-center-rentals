# MCP Supabase Multi-Project Setup Guide

This guide explains how to switch between multiple Supabase projects when using the MCP Supabase server.

## Problem

The MCP Supabase server connects to a single project at a time. When working with multiple projects, you need a way to switch between them.

## Solution Options

### Option 1: Automatic Switching (Recommended) ⭐

**Automatic switching when you change directories!**

**Setup (one-time):**
```bash
# Run the setup script
./setup-auto-switch.sh
```

This will:
1. Add auto-switch functionality to your shell profile (`.zshrc` or `.bash_profile`)
2. Automatically detect and switch Supabase projects when you `cd` into a directory

**Usage:**
After setup, just navigate to your project directories:
```bash
cd /path/to/project1  # Automatically switches to project1's Supabase
cd /path/to/project2  # Automatically switches to project2's Supabase
```

The script will:
- Detect the Supabase project linked to the current directory
- Set the `SUPABASE_PROJECT_REF` environment variable automatically
- Show a message when switching projects

**Note:** You may need to restart your MCP server or IDE for the changes to take effect after switching.

**Manual Switch (if needed):**
```bash
# In your project directory
source switch-supabase-project.sh
```

### Option 2: Manual Environment Variable

Set the `SUPABASE_PROJECT_REF` environment variable before starting your MCP server:

```bash
export SUPABASE_PROJECT_REF=ikdcngemtzjfurjduljs
# Then start/restart your MCP server
```

### Option 3: Use the Environment File

1. Edit `.supabase-mcp-env` in your project directory
2. Update `SUPABASE_PROJECT_REF` with your project reference ID
3. Source the file: `source .supabase-mcp-env`
4. Restart your MCP server

### Option 4: Per-Project Configuration

Create a `.supabase-mcp-env` file in each project directory with the appropriate project reference.

## Finding Project References

To see all your Supabase projects and their reference IDs:

```bash
supabase projects list
```

The currently linked project will be marked with `●`.

## Linking a Directory to a Project

If a directory isn't linked to a Supabase project:

```bash
cd /path/to/your/project
supabase link --project-ref <your-project-ref>
```

## Current Project

- **Project Reference:** `ikdcngemtzjfurjduljs`
- **Project Name:** Spokane-rent-Facebook
- **Region:** West US (North California)

## Quick Reference

```bash
# Get current project ref
./get-supabase-project-ref.sh

# Switch to current directory's project
source switch-supabase-project.sh

# List all projects
supabase projects list

# Link current directory to a project
supabase link --project-ref <project-ref>
```

## MCP Server Configuration

The MCP Supabase server typically reads the `SUPABASE_PROJECT_REF` environment variable. Make sure your MCP server configuration includes this variable, or update it when switching projects.

If your MCP server uses a configuration file, you may need to update that file directly or restart the server after changing environment variables.

