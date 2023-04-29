import { defineStore } from "pinia";
import { FallbackPosition, Font, useFonts } from "./useFonts";
import { computed, reactive } from "vue";
import { createId } from "~/modules/utils";

export const useViews = defineStore("views", () => {
  const fonts = useFonts();

  // ================================================
  // States
  const _storage = reactive<{
    [key: string]: View;
  }>({});

  const _genericTab = {};

  // ================================================
  // Getters
  const _listedIds = computed(() => {
    return Object.keys(_storage);
  });

  const length = computed(() => {
    return _listedIds.value.length;
  });

  // ================================================
  // Actions
  function addView(fontId: string) {
    const font = fonts.getById(fontId);

    if (!font) return false;

    const id = createId("viw");
  }

  function getByIndex(index: number): Font | undefined;
  function getByIndex(index: number, fallback: FallbackPosition): Font;
  function getByIndex(index: number, fallback?: undefined): Font | undefined;
  function getByIndex(index: number, fallback?: FallbackPosition) {
    const font = _storage[_listedIds.value[index]];
    if (font) return font;
    else if (fallback) return _getFallback(fallback);
    return undefined;
  }

  function getFirst() {
    return getByIndex(0)!;
  }

  function getLast() {
    return getByIndex(length.value - 1)!;
  }

  function getComputedLast() {
    return computed(() => getByIndex(length.value - 1)!);
  }

  function _getFallback(fallback: FallbackPosition): Font;
  function _getFallback(fallback?: undefined): undefined;
  function _getFallback(fallback?: FallbackPosition): Font | undefined {
    if (fallback === "last") return getLast();
    else if (fallback === "first") return getFirst();
    return undefined;
  }

  // ================================================
  return {};
});

class View {
  id: string;

  #activeTabId: string | undefined;
  #tabs: {
    [key: string]: Tab;
  };

  constructor(args: { id?: string }) {
    this.id = args.id ?? createId("viw");
    this.#activeTabId = undefined;
    this.#tabs = {};
  }
}

class Tab {
  #name: string | undefined;

  id: string;
  font: {
    id: string;
    activeFeatures: string[];
  };

  constructor(args: { id?: string; name?: string }) {
    this.id = args.id ?? createId("tab");
    this.#name = args.name;
    this.font = {
      id: "",
      activeFeatures: [],
    };
  }
}
