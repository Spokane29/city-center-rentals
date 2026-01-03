#!/bin/bash
# Script to switch MCP Supabase project based on current directory's Supabase link
# Usage: source switch-supabase-project.sh

# Get the current directory
CURRENT_DIR=$(pwd)

# Function to get project ref from Supabase link
get_project_ref() {
    local dir=$1
    cd "$dir" 2>/dev/null || return 1
    
    local project_ref=""
    
    # Method 1: Check for .supabase/project-ref file
    if [ -f ".supabase/project-ref" ]; then
        project_ref=$(cat .supabase/project-ref 2>/dev/null | tr -d '\n' | tr -d ' ')
    fi
    
    # Method 2: Get from linked projects list (look for ● marker)
    if [ -z "$project_ref" ]; then
        # The format is: | ● | ORG_ID | REFERENCE_ID | NAME | REGION | CREATED |
        # Field 3 contains the REFERENCE_ID
        project_ref=$(supabase projects list 2>&1 | grep -E "●" | awk -F'|' '{
            # Remove leading/trailing whitespace from field 3 (REFERENCE_ID)
            gsub(/^[ \t]+|[ \t]+$/, "", $3)
            if (length($3) == 20 && $3 ~ /^[a-z]+$/) {
                print $3
                exit
            }
        }' | head -1)
    fi
    
    # Method 3: Try to get from Supabase status
    if [ -z "$project_ref" ]; then
        project_ref=$(supabase status 2>/dev/null | grep -i "project" | grep -oE '[a-z]{20}' | head -1)
    fi
    
    # Method 4: Check if we're in a linked directory and extract from config
    if [ -z "$project_ref" ] && [ -f "supabase/config.toml" ]; then
        # Try to match project name with projects list
        local project_name=$(grep -E "^project_id" supabase/config.toml 2>/dev/null | cut -d'"' -f2)
        if [ -n "$project_name" ]; then
            project_ref=$(supabase projects list 2>&1 | grep -i "$project_name" | awk -F'|' '{print $4}' | tr -d ' ' | head -1)
        fi
    fi
    
    if [ -n "$project_ref" ]; then
        echo "$project_ref"
        return 0
    else
        return 1
    fi
}

# Function to set MCP environment variable
set_mcp_project() {
    local project_ref=$1
    
    if [ -z "$project_ref" ]; then
        echo "❌ Error: Could not determine project reference"
        echo "Make sure you're in a directory with a Supabase project linked"
        echo "Run: supabase link --project-ref <your-project-ref>"
        return 1
    fi
    
    # Export the project ref (this will be available in current shell)
    export SUPABASE_PROJECT_REF="$project_ref"
    
    # Also try to update a config file if it exists
    local config_file="$HOME/.supabase-mcp-config"
    echo "SUPABASE_PROJECT_REF=$project_ref" > "$config_file"
    
    echo "✅ Switched MCP Supabase to project: $project_ref"
    echo "📝 Configuration saved to: $config_file"
    echo ""
    echo "⚠️  Note: You may need to restart your MCP server or IDE for changes to take effect"
    echo "   The environment variable SUPABASE_PROJECT_REF is set for this shell session"
    
    return 0
}

# Main execution
PROJECT_REF=$(get_project_ref "$CURRENT_DIR")

if [ -n "$PROJECT_REF" ]; then
    set_mcp_project "$PROJECT_REF"
else
    echo "❌ Could not find linked Supabase project in: $CURRENT_DIR"
    echo ""
    echo "To link this directory to a Supabase project, run:"
    echo "  supabase link --project-ref <your-project-ref>"
    echo ""
    echo "Available projects:"
    supabase projects list 2>&1 | grep -E "REFERENCE|^\s+\|" | head -15
fi

