class RuntimeCache {
  private static instance: RuntimeCache;

  private constructor() {}

  public static getInstance(): RuntimeCache {
    if (RuntimeCache.instance === undefined) {
      RuntimeCache.instance = new RuntimeCache();
    }

    return RuntimeCache.instance;
  }
}

(() => {
  const cache1 = RuntimeCache.getInstance();
  const cache2 = RuntimeCache.getInstance();

  if (cache1 === cache2) {
    console.log("Singleton works, both variables contain the same instance.");
  } else {
    console.log("Singleton failed, variables contain different instances.");
  }
})();
