import { Slider, Engine, TSCMath, Circle } from 'tscratch';
import balls from './balls.ts';
import { SIZE, STATE } from './global.ts';

const engine = Engine.init();

export const speed = new Slider({
    label: 'Speed',
    value: -1,
    min: -5, max: 5,
    step: 0.1
});

export const count = new Slider({
    label: 'Count',
    value: 30,
    min: 1, max: 125,
    step: 1
});

count.onChange(newCount => {

    for (const ball of balls)
        engine.removeSprite(ball.sprite);

    balls.length = 0;

    for (let i = 0; i < newCount; i++) {
        
        const radius = Math.min(SIZE / newCount / 2.5, SIZE / 15);
        const angle = i * (180 / newCount);

        const x = (SIZE / 2 - radius) * TSCMath.sin(angle) * TSCMath.cos(angle + STATE.time);
        const y = (SIZE / 2 - radius) * TSCMath.cos(angle) * TSCMath.cos(angle + STATE.time);

        balls.push({
            sprite: new Circle({
                x, y,
                color: 'red',
                outlineWidth: 1,
                radius,
                dir: angle
            }),
            offset: angle
        });
    }
});