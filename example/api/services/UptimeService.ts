import { Service } from 'ts-framework-common';


export default class UptimeService extends Service {
  private static instance: UptimeService;

  history = {
    constructed: 0,
    mounted: 0,
    initialized: 0,
    ready: 0,
    unmounted: 0,
  };

  constructor(options) {
    super(options);
    this.history.constructed = Date.now();
  }
  public static getInstance() {
    if (!this.instance) {
      this.instance = new UptimeService({});
    }
    return this.instance;
  }
  onMount() {
    this.history.mounted = Date.now();
  }
  async onUnmount() {
    this.history.unmounted = Date.now();
  }
  async onInit(): Promise<void> {
    this.history.initialized = Date.now();
  }
  async onReady(): Promise<void> {
    this.history.ready = Date.now();
  }
  uptime() {
    if (this.history.ready) {
      // Ensure uptime is never zero after isReady
      return Math.max(1, Date.now() - this.history.ready);
    }
    return 0;
  }
}