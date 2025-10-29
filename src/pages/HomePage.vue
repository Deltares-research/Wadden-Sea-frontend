<template>
  <div class="scene" :style="{ backgroundImage: `url('${bgUrl}')` }" />

  <div class="title-band">
    <div class="page-title">
      Voice for Nature – Wadden Sea
    </div>
    <div class="page-subtitle">
      Interact with the environment
    </div>
  </div>

  <div class="ecosystem-overlay">
    <div
      v-for="item in items"
      :key="item.id"
      class="ecosystem-item"
      :class="{
        'is-disabled': item.placeholder,
        'shape-rectangular': getItemShape(item) === 'rectangular',
        'shape-circular': getItemShape(item) === 'circular',
      }"
      :style="{ ...getItemPosition(item), ...getItemSize(item) }"
      @click="handleItemClick(item)"
    >
      <div
        class="ring-wrap"
        :class="{
          'is-disabled': item.placeholder,
          'shape-rectangular': getItemShape(item) === 'rectangular',
          'shape-circular': getItemShape(item) === 'circular',
        }"
      >
        <v-card
          elevation="8"
          class="gallery-card"
          :class="{
            'is-disabled': item.placeholder,
            'shape-rectangular': getItemShape(item) === 'rectangular',
            'shape-circular': getItemShape(item) === 'circular',
          }"
          :aria-disabled="item.placeholder ? 'true' : 'false'"
        >
          <v-img
            :src="item.img"
            :height="getItemImageHeight(item)"
            cover
          >
            <template #sources />
            <div class="card-title">
              {{ item.title }}
            </div>
          </v-img>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useAppStore } from "@/stores/app";

  const router = useRouter();

  const base = import.meta.env.BASE_URL;
  const bgUrl = base + "bg/waddensea.jpg";

  const items = ref([]);

  onMounted(async () => {
    const appStore = useAppStore();
    await appStore.loadItems();
    const data = appStore.items;
    // Prepend BASE_URL to image paths and ensure position data
    items.value = data.map((item) => ({
      ...item,
      img: base + item.img,
      // Default positions if not specified (for backwards compatibility)
      position: item.position || { x: 50, y: 50 },
      // Default shape to rectangular if not specified
      shape: item.shape || "rectangular",
      // Default size if not specified (uses default dimensions)
      size: item.size || null,
    }));
  });

  /**
   * Calculate responsive position for an item based on its position data
   * Position values are percentages (0-100) relative to container
   */
  function getItemPosition(item) {
    const position = item.position || { x: 50, y: 50 };
    return {
      left: `${position.x}%`,
      top: `${position.y}%`,
      transform: "translate(-50%, -50%)", // Center the item on its position point
    };
  }

  function getItemShape(item) {
    return item.shape || "rectangular";
  }

  /**
   * Calculate size for an item based on its size data
   * Size can be:
   * - A number: width for rectangular, width/height for circular
   * - An object: { width: number, height?: number }
   * If not specified, uses default sizes
   */
  function getItemSize(item) {
    const shape = getItemShape(item);
    const size = item.size;

    if (!size) {
      // Default sizes
      if (shape === "circular") {
        return { width: "280px", height: "280px" };
      }
      return { width: "280px" }; // Rectangular uses fixed height from CSS
    }

    // If size is a number
    if (typeof size === "number") {
      if (shape === "circular") {
        return {
          width: `${size}px`,
          height: `${size}px`,
        };
      }
      return { width: `${size}px` }; // Rectangular: only width, height stays proportional
    }

    // If size is an object
    if (typeof size === "object") {
      const styles = { width: `${size.width}px` };
      if (shape === "circular") {
        // For circular, use height if provided, otherwise use width for square
        styles.height = size.height ? `${size.height}px` : `${size.width}px`;
      } else if (size.height) {
        // For rectangular, allow custom height
        styles.height = `${size.height}px`;
      }
      return styles;
    }

    return {};
  }

  /**
   * Get image height based on item shape and size
   */
  function getItemImageHeight(item) {
    const shape = getItemShape(item);
    const size = item.size;

    if (shape === "circular") {
      if (!size) return 280; // Default
      if (typeof size === "number") return size;
      if (typeof size === "object") return size.height || size.width || 280;
    }

    // Rectangular
    if (!size) return 180; // Default height for rectangular
    if (typeof size === "object" && size.height) return size.height;
    // For rectangular, maintain aspect ratio: height = (width / default_width) * default_height
    if (typeof size === "number") {
      return Math.round((size / 280) * 180);
    }
    return 180;
  }

  function handleItemClick(item) {
    if (!item?.id || item.placeholder) return;
    router.push(item.id);
  }
</script>

<style scoped>
@font-face {
  font-family: "Chapaza";
  src: url("/font/chapaza/Chapaza Italic.ttf") format("truetype");
  font-style: italic;
  font-weight: normal;
}

.scene {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.title-band {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  margin-top: 40px;
  padding: 8px 0 10px 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 20%,
    rgba(0, 0, 0, 0.8) 50%,
    rgba(0, 0, 0, 0.4) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);
}

.page-title {
  position: relative;
  text-align: center;
  color: #c8a389;
  font-family: "Chapaza", serif;
  font-style: italic;
  font-size: 56px;
  font-weight: normal;
  padding: 20px 0 0 0;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
}

.page-subtitle {
  position: relative;
  text-align: center;
  color: #c8a389;
  font-family: "Chapaza", serif;
  font-style: italic;
  font-size: 32px;
  font-weight: normal;
  padding: 8px 0 20px 0;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
}

.ecosystem-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.ecosystem-item {
  position: absolute;
  width: 280px; /* Default, can be overridden by inline style */
  pointer-events: auto;
  cursor: pointer;
  transition: transform 0.18s ease;
}

/* Circular items need square containers */
.ecosystem-item.shape-circular {
  width: 280px; /* Default, can be overridden by inline style */
  height: 280px; /* Default, can be overridden by inline style */
}

@media (max-width: 960px) {
  .ecosystem-item.shape-circular {
    width: 240px;
    height: 240px;
  }
}

@media (max-width: 600px) {
  .ecosystem-item.shape-circular {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 960px) {
  .ecosystem-item {
    width: 240px;
  }
}

@media (max-width: 600px) {
  .ecosystem-item {
    width: 200px;
  }
}

.ecosystem-item.is-disabled {
  pointer-events: none;
  cursor: default;
}

.ring-wrap {
  width: 100%;
  display: inline-block;
  border-radius: 14px;
  box-shadow: 0 0 10px 16px rgba(0, 0, 0, 0.6), 0 12px 28px rgba(0, 0, 0, 0.35);
  transition: box-shadow 0.18s ease, transform 0.18s ease;
}

.ring-wrap:hover {
  box-shadow: 0 0 10px 20px rgba(255, 255, 255, 0.6),
    0 18px 36px rgba(0, 0, 0, 0.45);
  transform: translateY(-2px);
}

.gallery-card {
  border-radius: 12px;
  overflow: hidden;
  width: 100% !important;
  display: block !important;
  min-height: 180px;
  aspect-ratio: auto;
}

/* Rectangular shape (default) */
.gallery-card.shape-rectangular {
  border-radius: 12px;
  aspect-ratio: auto;
}

.gallery-card.shape-rectangular :deep(.v-img) {
  border-radius: 12px;
}

/* Circular shape */
.gallery-card.shape-circular {
  border-radius: 50% !important;
  aspect-ratio: 1 / 1;
  width: 100% !important; /* Fill parent container */
  height: 100% !important; /* Fill parent container */
  min-height: 0;
  overflow: hidden !important;
  background: transparent !important;
  padding: 0 !important;
}

.gallery-card.shape-circular :deep(.v-img) {
  border-radius: 50% !important;
  width: 100% !important;
  height: 100% !important;
  min-height: 100%;
  aspect-ratio: 1 / 1;
  display: block;
}

.gallery-card.shape-circular :deep(.v-img__wrapper) {
  border-radius: 50% !important;
  overflow: hidden;
  width: 100% !important;
  height: 100% !important;
  position: relative;
}

.gallery-card.shape-circular :deep(.v-card__media) {
  height: 100% !important;
  width: 100% !important;
}

.ring-wrap.shape-circular {
  border-radius: 50%;
  width: 100%; /* Use 100% to fill parent container */
  aspect-ratio: 1 / 1;
}



.gallery-card :deep(.v-img) {
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  height: 180px;
  display: block;
}

.gallery-card :deep(.v-img__img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-card.shape-circular :deep(.v-img__img) {
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.card-title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 12px;
  font-weight: 600;
  color: white;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
  border-radius: 0 0 12px 12px;
}

/* Adjust card-title for circular shapes to follow the curve */
.gallery-card.shape-circular .card-title {
  border-radius: 0 0 50% 50%;
  padding: 15px;
  text-align: center;
}

.ring-wrap.is-disabled {
  pointer-events: none;
}
.gallery-card.is-disabled {
  cursor: default;
}
.ring-wrap.is-disabled:hover {
  box-shadow: 0 0 10px 16px rgba(0, 0, 0, 0.6), 0 12px 28px rgba(0, 0, 0, 0.35);
  transform: none;
}
</style>
