import  vertexShaderSource  from './shaders/vshaders.glsl?raw';
import fragmentShaderSource  from './shaders/fshader.glsl?raw';

class Renderer
{
    private canvas: HTMLCanvasElement;
    private g1: WebGL2RenderingContext;
    private program: WebGLProgram;

    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.g1 = this.canvas.getContext('webgl2')!;

        const vertexShader = this.createShader(this.g1.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.createShader(this.g1.FRAGMENT_SHADER, fragmentShaderSource);

        this.program = this.createProgram(vertexShader, fragmentShader);
        this.g1.useProgram(this.program);

        this.createBuffer([
            -0.5,-0.5,
            -0.5,0.5,
            0.5,-0.5,
        ]);
        this.g1.vertexAttribPointer(0, 2, this.g1.FLOAT, false, 0, 0);
        this.g1.enableVertexAttribArray(0);

        this.createBuffer([
            1,0,0,
            0,1,0,
            0,0,1,
        ]);

        this.g1.vertexAttribPointer(1, 3, this.g1.FLOAT, false, 0, 0);
        this.g1.enableVertexAttribArray(1);
    }
    /**
     * create a webgl program
     * @param vertexShader  - vertex shader
     * @param fragmentShader - fragment shader
     * @returns 
     */
    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram 
    {

        const program = this.g1.createProgram()!;
        this.g1.attachShader(program, vertexShader);
        this.g1.attachShader(program, fragmentShader);
        this.g1.linkProgram(program);

        const success = this.g1.getProgramParameter(program, this.g1.LINK_STATUS);
        if (!success) {
            console.error(`programe fail to link: ${this.g1.getProgramInfoLog(program)}`);
            this.g1.deleteProgram(program);
        }
        return program;
    }
    /**
     * create a shader
     * @param type - gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
     * @param source - shader source code as string
     * @returns {WebGLShader}
     */
    private createShader(type: number, source: string): WebGLShader 
    {
        const shader = this.g1.createShader(type)!;
        this.g1.shaderSource(shader, source);
        this.g1.compileShader(shader);

        const success = this.g1.getShaderParameter(shader, this.g1.COMPILE_STATUS);
        if (!success) {
            console.error(`shader fail to compile: ${this.g1.getShaderInfoLog(shader)}`);
            this.g1.deleteShader(shader);
        }
        return shader;
    }
    /**
     * create a buffer to store data
     * @param data - data to be stored in the buffer
     * @returns {WebGLBuffer}
     */
    private createBuffer(data: number[]): WebGLBuffer{
        const buffer = this.g1.createBuffer()!;
        this.g1.bindBuffer(this.g1.ARRAY_BUFFER, buffer);
        this.g1.bufferData(this.g1.ARRAY_BUFFER, new Float32Array(data), this.g1.STATIC_DRAW);
        return buffer;
    }
    public draw():void 
    {
        this.g1.clearColor(0.8, 0.8, 0.8, 1.0);
        this.g1.clear(this.g1.COLOR_BUFFER_BIT);

        this.g1.drawArrays(this.g1.TRIANGLES, 0, 3);

    }
}
const renderer = new Renderer();
renderer.draw();