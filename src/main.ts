class Renderer
{
    private canvas: HTMLCanvasElement;
    private g1: WebGL2RenderingContext;

    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.g1 = this.canvas.getContext('webgl2') as WebGL2RenderingContext;
    }
    public render() {
        this.g1.clearColor(1.0, 0.0, 0.0, 1.0);
        this.g1.clear(this.g1.COLOR_BUFFER_BIT);
    }
}
const renderer = new Renderer();
renderer.render();