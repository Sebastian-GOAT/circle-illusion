import { Circle, Engine, Pen, TSCMath, Watermark } from 'tscratch';
import * as SLIDERS from './sliders.ts';
import balls from './balls.ts';
import { SIZE, STATE } from './global.ts';

// Watermark
new Watermark();

// Sprites
Pen.drawSprite(Circle, { color: 'transparent', outlineWidth: 2, radius: SIZE / 2 });

// Update loop
const engine = Engine.init();
engine.setMaxFPS(60);

engine.setLoop('main', () => {

    const dt = engine.getDeltaTime();
    STATE.time = (STATE.time + 120 * SLIDERS.speed.value * dt) % 360;
    
    for (const ball of balls) {
        
        ball.goTo(
            (SIZE / 2 - ball.radius) * TSCMath.sin(ball.dir) * TSCMath.cos(ball.dir + STATE.time),
            (SIZE / 2 - ball.radius) * TSCMath.cos(ball.dir) * TSCMath.cos(ball.dir + STATE.time)
        );
    }
});

engine.onKeyPress('up', () => SLIDERS.count.value++, { allowHold: false });
engine.onKeyPress('down', () => SLIDERS.count.value--, { allowHold: false });
engine.onKeyPress('space', () => {
    SLIDERS.speed.toggle();
    SLIDERS.count.toggle();
}, { allowHold: false });