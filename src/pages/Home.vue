<template>
  <div class="scene" :style="{ backgroundImage: `url('${bgUrl}')` }"></div>

  <v-item-group v-model="selected" class="gallery-overlay" mandatory>
    <v-container class="py-12">
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-item :value="item.id" v-slot="{ isSelected, toggle }">
            <div class="ring-wrap">
              <v-card
                elevation="8"
                class="gallery-card"
                @click="
                  () => {
                    toggle();
                    go(item);
                  }
                "
              >
                <v-img :src="item.img" height="180" cover>
                  <template #sources />
                  <div class="card-title">{{ item.title }}</div>
                </v-img>
              </v-card>
            </div>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const base = import.meta.env.BASE_URL;
const bgUrl = base + "bg/waddensea.jpg";
const assets = base + "assets/";

const items = ref([]);
const selected = ref(null);

onMounted(async () => {
  const res = await fetch(assets + "items.json");
  const data = await res.json();
  // Prepend BASE_URL to image paths
  items.value = data.map((item) => ({
    ...item,
    img: base + item.img,
  }));
  selected.value = items.value[0]?.id ?? null;
});

function go(item) {
  if (!item?.id) return;
  router.push(item.id);
}
</script>

<style scoped>
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

.gallery-overlay {
  position: relative;
  z-index: 1;
}

.ring-wrap {
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
}

.gallery-card :deep(.v-img) {
  border-radius: 12px;
  overflow: hidden;
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
}
</style>
