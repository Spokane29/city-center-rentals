#!/bin/bash
# Setup script to enable automatic Supabase project switching
# This adds the auto-switch functionality to your shell profile

SHELL_NAME=$(basename "$SHELL")
SHELL_PROFILE=""

case "$SHELL_NAME" in
    bash)
        if [ -f "$HOME/.bash_profile" ]; then
            SHELL_PROFILE="$HOME/.bash_profile"
        elif [ -f "$HOME/.bashrc" ]; then
            SHELL_PROFILE="$HOME/.bashrc"
        else
            SHELL_PROFILE="$HOME/.bash_profile"
        fi
        ;;
    zsh)
        SHELL_PROFILE="$HOME/.zshrc"
        ;;
    *)
        echo "⚠️  Unsupported shell: $SHELL_NAME"
        echo "Please manually add the auto-switch script to your shell profile"
        exit 1
        ;;
esac

# Use a fixed location in home directory for the auto-switch script
AUTO_SWITCH_SCRIPT="$HOME/.supabase-auto-switch.sh"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_SCRIPT="$SCRIPT_DIR/.auto-switch-supabase.sh"

# Copy the script to home directory so it works from anywhere
if [ -f "$SOURCE_SCRIPT" ]; then
    cp "$SOURCE_SCRIPT" "$AUTO_SWITCH_SCRIPT"
    chmod +x "$AUTO_SWITCH_SCRIPT"
fi

# Check if already added
if grep -q "auto-switch-supabase" "$SHELL_PROFILE" 2>/dev/null; then
    echo "✅ Auto-switch is already set up in $SHELL_PROFILE"
    echo ""
    echo "To use it, restart your terminal or run:"
    echo "  source $SHELL_PROFILE"
    exit 0
fi

# Add to shell profile
echo "" >> "$SHELL_PROFILE"
echo "# Auto-switch Supabase project when changing directories" >> "$SHELL_PROFILE"
echo "# Installed by: $SCRIPT_DIR/setup-auto-switch.sh" >> "$SHELL_PROFILE"
echo "if [ -f \"$AUTO_SWITCH_SCRIPT\" ]; then" >> "$SHELL_PROFILE"
echo "    source \"$AUTO_SWITCH_SCRIPT\"" >> "$SHELL_PROFILE"
echo "fi" >> "$SHELL_PROFILE"

echo "✅ Auto-switch has been added to $SHELL_PROFILE"
echo ""
echo "To activate it, run:"
echo "  source $SHELL_PROFILE"
echo ""
echo "Or restart your terminal."
echo ""
echo "Now when you 'cd' into a directory with a Supabase project,"
echo "it will automatically switch the MCP connection!"

