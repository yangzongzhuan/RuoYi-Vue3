/** 模块类型声明 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/** Vite 环境变量类型 */
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// element-plus
declare module 'element-plus'

// vue
declare module 'vue' {
  interface ComponentInternalInstance { proxy: any }
}

// nprogress
declare module 'nprogress' {
  export interface NProgressOptions {
    minimum?: number
    template?: string
    easing?: string
    speed?: number
    trickle?: boolean
    trickleSpeed?: number
    showSpinner?: boolean
    parent?: string
    barSelector?: string
  }

  export interface NProgress {
    start(): NProgress
    set(n: number): NProgress
    inc(amount?: number): NProgress
    done(force?: boolean): NProgress
    remove(): void
    configure(options: NProgressOptions): NProgress
    status: number | null
  }

  const nprogress: NProgress
  export default nprogress
}

// js-cookie
declare module 'js-cookie' {
  export default Cookies
}

// file-saver
declare module 'file-saver' {
  export function saveAs(data: Blob | string, filename?: string, options?: any): void
  export function saveAs(data: Blob | string, filename?: string, disableAutoBOM?: boolean): void
  export default saveAs
}

// jsencrypt
declare module 'jsencrypt/bin/jsencrypt.min' {
  import JSEncrypt from 'jsencrypt'
  export default JSEncrypt
}

// axios
declare module 'axios'

// vue-quill
declare module '@vueup/vue-quill'

// sortablejs
declare module 'sortablejs' {
  export interface SortableEvent {
    oldIndex: number;
    newIndex: number;
  }
  
  export interface SortableOptions {
    ghostClass?: string;
    onEnd?: (evt: SortableEvent) => void;
  }
  
  export default class Sortable {
    static create(el: HTMLElement, options: SortableOptions): Sortable;
  }
}

// fuse
declare module 'fuse.js' {
  export interface FuseOptions<T> {
    keys: string[];
    threshold?: number;
    includeScore?: boolean;
    includeMatches?: boolean;
    minMatchCharLength?: number;
    shouldSort?: boolean;
    // 添加其他你需要的选项
  }
  
  export default class Fuse<T> {
    constructor(list: T[], options?: FuseOptions<T>)
    search(pattern: string): T[]
  }
}

// vuedraggable
declare module 'vuedraggable/dist/vuedraggable.common' {
  import { DefineComponent } from 'vue'
  const draggable: DefineComponent
  export default draggable
}

// vue-cropper
declare module 'vue-cropper' {
  import { DefineComponent } from 'vue'
  const VueCropper: DefineComponent
  export { VueCropper }
}

// splitpanes
declare module 'splitpanes' {
  import { DefineComponent } from 'vue'
  
  export const Splitpanes: DefineComponent
  export const Pane: DefineComponent
}
