# MCP Server Configuration Guide

## Current Status

- ✅ Config file updated: `~/.supabase-mcp-config` has `ikdcngemtzjfurjduljs`
- ⚠️ MCP server still connected to: `pxwenfxbmibfyuhnmdwe` (old project)

## How to Configure MCP Server

The MCP Supabase server needs to be configured in your IDE/MCP settings. Here's how:

### Option 1: Cursor IDE Settings

1. Open Cursor Settings (Cmd+,)
2. Search for "MCP" or "Supabase"
3. Find the MCP Supabase server configuration
4. Update the `SUPABASE_PROJECT_REF` environment variable to: `ikdcngemtzjfurjduljs`
5. Restart Cursor

### Option 2: MCP Configuration File

The MCP server configuration is typically in one of these locations:

**For Cursor:**
- `~/.cursor/mcp.json` or similar
- Check Cursor's settings directory

**Look for a configuration like:**
```json
{
  "mcpServers": {
    "supabase": {
      "env": {
        "SUPABASE_PROJECT_REF": "ikdcngemtzjfurjduljs"
      }
    }
  }
}
```

### Option 3: Environment Variables

If your MCP server reads from system environment variables:

1. Add to your shell profile (`~/.zshrc`):
   ```bash
   export SUPABASE_PROJECT_REF=ikdcngemtzjfurjduljs
   ```

2. Restart your terminal and IDE

### Option 4: Check MCP Server Documentation

The MCP Supabase server may have specific configuration requirements. Check:
- Cursor's MCP documentation
- The MCP Supabase server's README
- Your IDE's MCP configuration guide

## Verification

After updating the configuration, verify it's working:

1. The MCP server should connect to: `ikdcngemtzjfurjduljs`
2. The project URL should be: `https://ikdcngemtzjfurjduljs.supabase.co`
3. The database should be empty (fresh project)

## Current Project Info

- **Project Reference:** `ikdcngemtzjfurjduljs`
- **Project Name:** Spokane-rent-Facebook
- **Expected URL:** `https://ikdcngemtzjfurjduljs.supabase.co`

## Quick Fix Script

Run this to ensure the environment variable is set:

```bash
export SUPABASE_PROJECT_REF=ikdcngemtzjfurjduljs
echo "SUPABASE_PROJECT_REF=$SUPABASE_PROJECT_REF"
```

Then restart your MCP server/IDE.

