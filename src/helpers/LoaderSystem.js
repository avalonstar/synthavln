import { useEffect, useRef, useCallback, useReducer } from 'react';
import { Loader, middleware } from 'resource-loader';

class LoaderSystem {
  constructor({
    baseUrl = '',
    concurency = 10,
    resourceCollection,
    resourceExt,
    onStartHandler,
    onProgressHandler,
    onErrorHandler,
    onLoadHandler,
    onCompleteHandler,
    debug
  }) {
    // setup loader
    this.loader = new Loader(baseUrl, concurency);
    this.loader.pre(middleware.caching);
    this.loader.use(middleware.parsing);

    // bind config
    this.debug = debug;
    this.resourceCollection = resourceCollection;
    this.resourceExt = resourceExt;
    this.hasCustomErrorHandler = onErrorHandler;

    // setup handlers
    this.loader.onStart.add(this.onStart);
    if (onStartHandler) this.loader.onStart.add(onStartHandler);
    this.loader.onProgress.add(this.onProgress);
    if (onProgressHandler) this.loader.onProgress.add(onProgressHandler);
    this.loader.onError.add(this.onError);
    if (onErrorHandler) this.loader.onError.add(onErrorHandler);
    this.loader.onLoad.add(this.onLoad);
    if (onLoadHandler) this.loader.onLoad.add(onLoadHandler);
    this.loader.onComplete.add(this.onComplete);
    if (onCompleteHandler) this.loader.onComplete.add(onCompleteHandler);

    // initialize the system, add resources if provided and load
    this.initSystem();
  }

  get loading() {
    return this.loader.loading;
  }

  get resources() {
    return this.loader.resources;
  }

  add = (...args) => {
    this.loader.add(...args);
  };

  load = (...args) => {
    this.loader.load(...args);
  };

  reset = () => {
    this.loader.reset();
  };

  initSystem = () => {
    this.reset();
    if (this.resourceCollection) {
      const resourceList = Object.keys(this.resourceCollection).map(key => ({
        name: key,
        url: `${key}.${this.resourceCollection[key].ext || this.resourceExt}`,
        crossOrigin: ''
      }));
      this.add(resourceList);
      this.load();
    }
  };

  onStart = _loader => {
    if (this.debug) {
      console.log('Starting resource loader');
    }
  };

  onProgress = (loader, resource) => {
    if (this.debug) {
      console.log(
        `Loading: ${resource.name || resource.url} -=- Progress: ${
          loader.progress
        }%`
      );
    }
  };

  onError = (error, _loader, resource) => {
    if (this.debug || !this.hasCustomErrorHandler) {
      console.log(
        `Resource loader error occured while loading ${resource.name ||
          resource.url}`
      );
      console.error(resource.error || error);
    }
  };

  onLoad = (_loader, resource) => {
    if (this.debug) {
      console.log(`Loaded: ${resource.name || resource.url}`);
    }
  };

  onComplete = (_loader, resources) => {
    if (this.debug) {
      console.log('All resources loaded');
    }
    if (this.resourceCollection) {
      Object.keys(this.resourceCollection).forEach(key => {
        resources[key].steps = this.resourceCollection[key].steps;
      });
    }
  };
}

const initialLoaderState = {
  initialized: false,
  loaded: false,
  error: null,
  resetRequested: false
};

const loaderReducer = (state, action) => {
  switch (action.type) {
    case 'initialized':
      return {
        ...state,
        initialized: true
      };
    case 'loaded':
      return {
        ...state,
        loaded: true
      };
    case 'error':
      const existingErrors = state.error || [];
      return {
        ...state,
        error: [
          ...existingErrors,
          {
            nativeError: action.payload.error,
            resource: action.payload.resource
          }
        ]
      };
    case 'requestReset':
      return {
        ...initialLoaderState,
        resetRequested: true
      };
    case 'resetSystem':
      return { ...initialLoaderState };
    default:
      return state;
  }
};

export const useLoaderSystem = ({
  baseUrl,
  concurency,
  resourceCollection,
  resourceExt,
  onStartHandler,
  onProgressHandler,
  onErrorHandler,
  onLoadHandler,
  onCompleteHandler,
  debug
}) => {
  const loader = useRef();
  const [{ initialized, loaded, error, resetRequested }, dispatch] = useReducer(
    loaderReducer,
    initialLoaderState
  );

  const resetSystem = useCallback(() => {
    dispatch({ type: 'requestReset' });
  }, []);

  const internalStartHandler = useCallback(
    loader => {
      dispatch({ type: 'initialized' });
      if (onStartHandler) onStartHandler(loader);
    },
    [onStartHandler]
  );

  const internalErrorHandler = useCallback(
    (error, loader, resource) => {
      dispatch({
        type: 'error',
        payload: {
          nativeError: resource.error || error,
          resource
        }
      });
      if (onErrorHandler) onErrorHandler(loader, resource);
    },
    [onErrorHandler]
  );

  const internalCompleteHandler = useCallback(
    (loader, resources) => {
      dispatch({ type: 'loaded' });
      if (onCompleteHandler) onCompleteHandler(loader, resources);
    },
    [onCompleteHandler]
  );

  useEffect(() => {
    if (debug && resetRequested) {
      console.log('Reseting loader system');
    }
    const loaderSystem = new LoaderSystem({
      baseUrl,
      concurency,
      resourceCollection,
      resourceExt,
      onStartHandler: internalStartHandler,
      onProgressHandler,
      onErrorHandler: internalErrorHandler,
      onLoadHandler,
      onCompleteHandler: internalCompleteHandler,
      debug
    });
    loader.current = loaderSystem;
    return () => {
      loaderSystem.reset();
    };
  }, [
    baseUrl,
    concurency,
    resourceCollection,
    resourceExt,
    internalStartHandler,
    onProgressHandler,
    internalErrorHandler,
    onLoadHandler,
    internalCompleteHandler,
    debug,
    resetRequested
  ]);

  return {
    initialized,
    loaded,
    error,
    resources: loader && loader.current ? loader.current.resources : {},
    resetSystem
  };
};
