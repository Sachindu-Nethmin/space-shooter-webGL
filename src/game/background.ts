import { Content } from "../content";
import { Rect } from "../rect";
import { SpriteRenderer } from "../sprite-renderer";

const BACKGROUND_SCROLL_SPEED = 0.25;

export class Background {
    private drawRect: Rect;
    private drawRect2: Rect;
    private readonly gameHeight: number;

    constructor(width: number, height: number) {
        this.gameHeight = height;
        this.drawRect = new Rect(0, 0, width, height);
        this.drawRect2 = new Rect(0, -height, width, height);
    }

    update(dt: number) {
        this.drawRect.y += BACKGROUND_SCROLL_SPEED * dt;
        this.drawRect2.y = this.drawRect.y - this.gameHeight;

        if (this.drawRect.y > this.gameHeight) {
            const temp = this.drawRect;
            this.drawRect = this.drawRect2;
            this.drawRect2 = temp;
        }
    }

    draw(spriteRenderer: SpriteRenderer) {
        spriteRenderer.drawSprite(Content.backgroundTexture, this.drawRect);
        spriteRenderer.drawSprite(Content.backgroundTexture, this.drawRect2);
    }
}