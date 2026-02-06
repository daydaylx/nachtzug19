#!/bin/bash
#
# Download Stock Backgrounds from Unsplash
# This script downloads high-quality stock images to replace placeholder backgrounds
# All images are from Unsplash (free for commercial use)
#
# Usage: ./download_stock_backgrounds.sh
#

set -e

TARGET_DIR="../android-native/app/src/main/res/drawable-nodpi"
WIDTH=1620
HEIGHT=1080

echo "🎨 Downloading stock backgrounds from Unsplash..."
echo "Target directory: $TARGET_DIR"
echo "Resolution: ${WIDTH}x${HEIGHT}"
echo ""

# Function to download image from Unsplash Source API
download_image() {
    local query="$1"
    local output_file="$2"
    local temp_file="${output_file}.tmp"

    echo "📥 Downloading: $output_file"
    echo "   Query: $query"

    # Unsplash Source API: https://source.unsplash.com/{WIDTHxHEIGHT}/?{QUERY}
    curl -L -o "$temp_file" \
        "https://source.unsplash.com/${WIDTH}x${HEIGHT}/?${query}" \
        --silent --show-error

    if [ -f "$temp_file" ]; then
        mv "$temp_file" "$output_file"
        echo "   ✓ Success: $(du -h "$output_file" | cut -f1)"
    else
        echo "   ✗ Failed to download"
        return 1
    fi

    # Sleep to avoid rate limiting
    sleep 2
}

cd "$(dirname "$0")"

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

echo "=== LOCATIONS ==="

# 1. Compartment - Train compartment interior
download_image "train,compartment,interior,vintage,dark" \
    "$TARGET_DIR/bg_loc_compartment_v1.png"

# 2. Comp7 - Dark, ominous train compartment
download_image "train,cabin,dark,moody,night" \
    "$TARGET_DIR/bg_loc_comp7_v1.png"

echo ""
echo "=== SCENES ==="

# 3. Control - Authority, checkpoint
download_image "control,room,industrial,dark,authority" \
    "$TARGET_DIR/bg_scene_control_v1.png"

# 4. Mirror - Reflection, identity
download_image "mirror,reflection,dark,moody,abstract" \
    "$TARGET_DIR/bg_scene_mirror_v1.png"

# 5. Void - Empty, darkness
download_image "void,dark,black,empty,abstract" \
    "$TARGET_DIR/bg_scene_void_v1.png"

# 6. Announcement - PA system, speakers
download_image "speaker,announcement,industrial,station" \
    "$TARGET_DIR/bg_scene_announcement_v1.png"

# 7. Dissolve - Dissolving reality
download_image "abstract,dissolve,fade,dark,surreal" \
    "$TARGET_DIR/bg_scene_dissolve_v1.png"

echo ""
echo "=== ENDINGS ==="

# 8. EndingCity - City lights, urban
download_image "city,night,lights,skyline,urban" \
    "$TARGET_DIR/bg_ending_city_v1.png"

# 9. EndingReunion - Warmth, connection
download_image "warm,light,cozy,home,reunion" \
    "$TARGET_DIR/bg_ending_reunion_v1.png"

# 10. EndingHome - Domestic, safety
download_image "home,interior,cozy,warm,comfortable" \
    "$TARGET_DIR/bg_ending_home_v1.png"

# 11. EndingLibrary - Books, knowledge
download_image "library,books,archive,knowledge,vintage" \
    "$TARGET_DIR/bg_ending_library_v1.png"

echo ""
echo "✅ Download complete!"
echo ""
echo "NOTE: Unsplash Source API provides random images matching the query."
echo "If you want specific images, visit https://unsplash.com and download manually."
echo ""
echo "To use these images:"
echo "1. Review downloaded images in: $TARGET_DIR"
echo "2. Replace any unsatisfactory images manually from Unsplash/Pexels"
echo "3. Rebuild the Android app: cd android-native && ./gradlew assembleDebug"
