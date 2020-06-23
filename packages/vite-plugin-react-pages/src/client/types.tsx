import React from 'react'

export interface IPages {
  [path: string]: {
    staticData: any
    /** The nearest _theme.tsx from the page module */
    theme: ITheme
  }
}
export interface IPagesInternal {
  [path: string]: {
    _importFn: () => Promise<IPageLoaded>
    staticData: any
    /** The nearest _theme.tsx from the page module */
    theme: ITheme
  }
}
export type IPageLoaded = any
export type IRenderPage = (
  pageData: any,
  pages: IPages
) => React.ReactElement | null

export interface ITheme {
  /**
   * loading the first page's data, render the initial loading state.
   * if the app is build with ssr,
   * vite-pages will not use it to render the initial loading state.
   *
   * @param pageStaticData current page's static data.
   * @param pages all page's static data.
   */
  initialLoading: (
    pageStaticData: any,
    pages: IPages
  ) => React.ReactElement | null
  /**
   * current page's data is ready, render the page content.
   *
   * @param pageData current page's data. including static data and runtime data.
   * @param pages all page's static data.
   */
  loaded: (pageData: IPageLoaded, pages: IPages) => React.ReactElement | null
  /**
   * app is loading another page, render the transition loading state.
   * if transitionLoading is not provided, vite-pages will fallback to initialLoading.
   *
   * @param pageStaticData current page's static data.
   * @param pages all page's static data.
   * @param prevPageData previous page's data.
   */
  transitionLoading?: (
    pageStaticData: any,
    pages: IPages,
    prevPageData: IPageLoaded
  ) => React.ReactElement | null
  /**
   * If error happens while loading,
   * vite-pages will use it to render the error state.
   *
   * @param error the error.
   * @param pageStaticData current page's static data.
   * @param pages all page's static data.
   */
  loadError: (
    error: any,
    pageStaticData: any,
    pages: IPages
  ) => React.ReactElement | null
}