#!/bin/bash
# NACHTZUG 19 - Background Assets Download Script
# Downloads free stock photos from Unsplash and Pexels

set -e

TARGET_DIR="android-native/app/src/main/res/drawable-nodpi"
TEMP_DIR="/tmp/nachtzug19_backgrounds"

echo "🎨 Downloading background assets for NACHTZUG 19..."
echo "Target: $TARGET_DIR"

# Create directories
mkdir -p "$TARGET_DIR"
mkdir -p "$TEMP_DIR"

# Unsplash Download Function
download_unsplash() {
    local photo_id=$1
    local filename=$2
    local description=$3

    echo "📥 Downloading: $description"
    echo "   → $filename"

    # Unsplash download URL (automatically serves optimized version)
    wget -q --show-progress \
        -O "$TEMP_DIR/$filename" \
        "https://unsplash.com/photos/$photo_id/download?force=true&w=1920" \
        || curl -L -o "$TEMP_DIR/$filename" \
        "https://unsplash.com/photos/$photo_id/download?force=true&w=1920"
}

# Pexels Direct Download (requires direct image URL)
download_pexels() {
    local url=$1
    local filename=$2
    local description=$3

    echo "📥 Downloading: $description"
    echo "   → $filename"

    wget -q --show-progress -O "$TEMP_DIR/$filename" "$url" \
        || curl -L -o "$TEMP_DIR/$filename" "$url"
}

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Downloading 6 Core Backgrounds (Unsplash - Free License)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. Platform - Empty train station at night with rain
download_unsplash "8BTrldpHRMY" "bg_loc_platform__v1.jpg" \
    "Platform: Empty station at night with rain"

# 2. Platform Alternative - Dark lonely train station
download_unsplash "zd0E8kFPdNQ" "bg_loc_platform_alt__v1.jpg" \
    "Platform Alt: Dark and lonely station"

# 3. Corridor - Train sits at empty platform (for corridor view)
download_unsplash "CvCxSi8YYU0" "bg_loc_corridor__v1.jpg" \
    "Corridor: Train at empty platform (side view)"

# 4. Night Train General (usable for multiple scenes)
download_unsplash "R1OKYQkalRc" "bg_scene_night_general__v1.jpg" \
    "General: Train traveling through city at night"

# 5. Compartment/Window - Person on platform (atmospheric)
download_unsplash "wf5OsQYERwU" "bg_loc_window__v1.jpg" \
    "Window: Person standing on platform at night"

# 6. Transition - Train traveling at night
download_unsplash "erZGzBphzpk" "bg_loc_transition__v1.jpg" \
    "Transition: Train traveling down tracks at night"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Converting and Optimizing Images..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

for img in "$TEMP_DIR"/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img" .jpg)

        echo "🔄 Converting: $filename.jpg → $filename.png"

        # Convert to PNG and resize to max 1920x1080, optimize for <300KB
        if command -v convert &> /dev/null; then
            # ImageMagick available
            convert "$img" \
                -resize '1920x1080>' \
                -quality 85 \
                -define png:compression-level=9 \
                "$TARGET_DIR/$filename.png"
        elif command -v ffmpeg &> /dev/null; then
            # FFmpeg available
            ffmpeg -i "$img" \
                -vf "scale='min(1920,iw)':min(1080,ih):force_original_aspect_ratio=decrease" \
                -y "$TARGET_DIR/$filename.png" 2>/dev/null
        else
            # No converter, just copy as-is
            echo "   ⚠️  No image converter found, copying JPG directly"
            cp "$img" "$TARGET_DIR/$filename.jpg"
        fi

        # Check file size
        if [ -f "$TARGET_DIR/$filename.png" ]; then
            size=$(du -h "$TARGET_DIR/$filename.png" | cut -f1)
            echo "   ✅ Size: $size"
        elif [ -f "$TARGET_DIR/$filename.jpg" ]; then
            size=$(du -h "$TARGET_DIR/$filename.jpg" | cut -f1)
            echo "   ✅ Size: $size (JPG)"
        fi
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Cleanup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

rm -rf "$TEMP_DIR"
echo "🗑️  Removed temporary files"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ DOWNLOAD COMPLETE!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Downloaded images:"
ls -lh "$TARGET_DIR"/*.png 2>/dev/null || ls -lh "$TARGET_DIR"/*.jpg 2>/dev/null || echo "  (No files found)"
echo ""
echo "📝 Note: All images are from Unsplash (free license, no attribution required)"
echo "   Source: https://unsplash.com/s/photos/night-train"
echo ""
echo "🚀 Next step: Build the app to see the backgrounds!"
echo "   cd android-native && ./gradlew assembleDebug"
