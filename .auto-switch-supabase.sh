#!/bin/bash
# Auto-switch Supabase project when entering a directory
# This should be sourced in your shell profile

# Function to auto-switch Supabase project
auto_switch_supabase() {
    local current_dir=$(pwd)
    
    # Check if we're in a directory with Supabase
    if [ -f "supabase/config.toml" ] || [ -d ".supabase" ] || [ -f ".supabase-mcp-env" ]; then
        # Get project ref
        local project_ref=""
        
        # Try to get from .supabase/project-ref
        if [ -f ".supabase/project-ref" ]; then
            project_ref=$(cat .supabase/project-ref 2>/dev/null | tr -d '\n' | tr -d ' ')
        fi
        
        # Try to get from linked projects
        if [ -z "$project_ref" ]; then
            project_ref=$(supabase projects list 2>&1 | grep -E "●" | awk -F'|' '{
                gsub(/^[ \t]+|[ \t]+$/, "", $3)
                if (length($3) == 20 && $3 ~ /^[a-z]+$/) {
                    print $3
                    exit
                }
            }' | head -1)
        fi
        
        # Check if we need to switch
        local current_mcp_ref="${SUPABASE_PROJECT_REF:-}"
        
        if [ -n "$project_ref" ] && [ "$project_ref" != "$current_mcp_ref" ]; then
            export SUPABASE_PROJECT_REF="$project_ref"
            echo "🔄 Switched MCP Supabase to: $project_ref"
            echo "   (Restart MCP server to apply changes)"
        fi
    fi
}

# Hook into cd command (for bash)
if [ -n "$BASH_VERSION" ]; then
    # Override cd function
    cd() {
        builtin cd "$@" && auto_switch_supabase
    }
fi

# Hook into chpwd (for zsh)
if [ -n "$ZSH_VERSION" ]; then
    chpwd() {
        auto_switch_supabase
    }
    # Also run on initial load
    auto_switch_supabase
fi

