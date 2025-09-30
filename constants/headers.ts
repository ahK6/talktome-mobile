export interface HeaderConfig {
  title?: string | null;
  showSearchBox?: boolean;
  showBackButton?: boolean;
  type?: 'default' | 'search' | 'hidden';
}

export const appHeaders: Record<string, HeaderConfig> = {
  "/post/createPost": {
    title: "Crear publicación",
    showSearchBox: false,
    showBackButton: true,
    type: 'default'
  },
  "/onBoarding/login": {
    title: null,
    showSearchBox: false,
    showBackButton: false,
    type: 'default'
  },
  "/onBoarding/createAccount": {
    title: "Registro",
    showSearchBox: false,
    showBackButton: true,
    type: 'default'
  },
  "/": {
    title: null,
    showSearchBox: true,
    showBackButton: false,
    type: 'search'
  },
  "/testimonies": {
    title: null,
    showSearchBox: true,
    showBackButton: false,
    type: 'search'
  },
  "/post/postDetail": {
    title: "",
    showSearchBox: false,
    showBackButton: true,
    type: 'default'
  },
  "/post/makeComment": {
    title: "",
    showSearchBox: false,
    showBackButton: true,
    type: 'default'
  }
};