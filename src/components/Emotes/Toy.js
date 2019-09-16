/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */

import React, { useEffect, useRef, useState } from 'react';
import p2 from 'p2';
import * as PIXI from 'pixi.js';
import moment from 'moment';
import styled from 'styled-components';

import { useChatContext } from 'providers';

import idMap from './assets/idMap.json';
import sprites from './hype.json';

const AUTO_SPAWN_FOR_TEST = false;
const { PUBLIC_URL } = process.env;

const SCALE = 0.5;
const IMG_WIDTH = 112 * SCALE;
const MAX_OBJECTS = 200;
const MAX_AGE = 180;
const HYPE_DURATION = 30;

const OBJECT = 2 ** 0;
const WALL = 2 ** 1;
const GROUND = 2 ** 2;

const WIDTH = 1920;
const HEIGHT = 1080;

function Toy() {
  const { connected, client } = useChatContext();
  const [hypeActive, setHypeActive] = useState(false);
  const [spamActive, setSpamActive] = useState(false);

  // Instance Variables.
  const hypeTimer = useRef(null);
  const lastTime = useRef(null);
  const objectList = useRef([]);
  const stageRef = useRef(null);
  const textures = useRef([]);

  // Construction.
  const world = new p2.World({ gravity: [0, -9.82] });
  const loader = new PIXI.Loader();
  const pixiApp = new PIXI.Application({
    width: WIDTH,
    height: HEIGHT,
    transparent: true,
    resolution: window.devicePixelRatio || 1
  });
  const pixiContainer = new PIXI.ParticleContainer(3000, {
    scale: true,
    rotation: true
  });

  const shuffleArray = (array, num) => {
    let target = num;
    if (num > array.length) {
      target = array.length;
    }
    const random = array.sort(() => 0.5 - Math.random()).slice(0, target);
    return random;
  };

  const createObject = (auto, cheer, emote) => {
    const object = {
      alive: true,
      created: moment(),
      render: null,
      physics: null
    };

    const x = Math.random() * WIDTH;
    const y = -1 * (IMG_WIDTH / 2 + 10);

    const angle = Math.random() * 360 * (Math.PI / 180);
    const angularVelocity = Math.random() * 5;

    const circleBody = new p2.Body({
      mass: Math.random() * 95 + 5,
      position: [x, y],
      angle,
      angularVelocity
    });
    const circleShape = new p2.Circle({ radius: IMG_WIDTH / 2 });
    circleBody.addShape(circleShape);
    circleShape.collisionGroup = OBJECT;
    circleShape.collisionMask = OBJECT | WALL | GROUND;

    object.physics = circleBody;
    world.addBody(circleBody);

    let spriteImg;

    if (emote) {
      spriteImg = textures.current[`${emote}.png`];
    } else {
      const emoteName =
        sprites[Math.floor(Math.random() * (sprites.length - 1))];
      spriteImg = textures.current[`${emoteName}.png`];
    }

    const blankObj = new PIXI.Sprite(spriteImg);
    blankObj.anchor.set(0.5);
    blankObj.scale.x = SCALE;
    blankObj.scale.y = SCALE;
    blankObj.x = x;
    blankObj.y = y;
    blankObj.rotation = angle;

    object.render = blankObj;

    pixiContainer.addChild(blankObj);

    objectList.current.push(object);

    if (auto && AUTO_SPAWN_FOR_TEST) {
      setTimeout(() => createObject(), (Math.random() * 4 + 1) * 1000);
      setTimeout(() => createObject(true, false), Math.random() * 2 * 1000);
    }
  };

  const handleSupport = inputValue => {
    const value = parseInt(inputValue, 10);
    if (value >= 500) {
      setHypeActive(true);
      clearTimeout(hypeTimer.current);
      hypeTimer.current = setTimeout(
        setHypeActive(false),
        HYPE_DURATION * 1000
      );
    }
    const timesIntermediary = Math.round(Math.max(1, value / 100));
    const times = timesIntermediary;
    for (let i = 0; i < times; i += 1) {
      setTimeout(() => createObject(false), (i + 1) * 250);
    }
  };

  const handleEmotes = emotes => {
    if (spamActive || hypeActive) {
      const acceptedEmotes = [];
      emotes.keys().forEach(emote => {
        if (idMap[emote]) {
          for (let i = 0; i < emotes[emote].length; i += 1) {
            acceptedEmotes.push(idMap[emote]);
          }
        }
      });
      shuffleArray(acceptedEmotes, 12).forEach((emote, id) => {
        setTimeout(() => createObject(false, false, emote), (id + 1) * 350);
      });
    }
  };

  const calculateSubValue = plan => {
    let value = 100;
    switch (plan) {
      case 'Prime':
      case '1000':
        value *= 5;
        break;
      case '2000':
        value *= 10;
        break;
      case '3000':
        value *= 25;
        break;
      default:
        value = 0;
        break;
    }

    return value;
  };

  const draw = () => {
    objectList.current.forEach(object => {
      [object.render.x] = object.physics.interpolatedPosition;
      object.render.y = -1 * object.physics.interpolatedPosition[1];
      object.render.rotation = object.physics.interpolatedAngle;
    });
  };

  const animate = time => {
    const { current } = lastTime;

    requestAnimationFrame(animate);
    const deltaTime = current ? (time - current) / 1000 : 0;
    world.step(1 / 60, deltaTime, 10);
    draw();
    lastTime.current = time;
  };

  const cleanup = () => {
    const { current } = objectList;
    const outOfBounds = -1 * (HEIGHT + IMG_WIDTH / 2 + 10);

    if (current.length > MAX_OBJECTS) {
      current.forEach((object, id) => {
        if (object.alive) {
          const age = moment().diff(object.created, 's');
          if (age > MAX_AGE / (4 * (current.length / MAX_OBJECTS))) {
            object.alive = false;
            object.physics.shapes[0].collisionMask = OBJECT | WALL;
          }
        } else if (object.physics.position[1] <= outOfBounds) {
          pixiApp.stage.removeChild(object.render);
          object.render.destroy();
          world.removeBody(object.physics);
          current.splice(id, 1);
        }
      });
    } else {
      current.forEach((object, id) => {
        if (object.alive) {
          const age = moment().diff(object.created, 's');
          if (age > MAX_AGE) {
            object.alive = false;
            object.physics.shapes[0].collisionMask = OBJECT | WALL;
          }
        } else if (object.physics.position[1] <= outOfBounds) {
          pixiApp.stage.removeChild(object.render);
          object.render.destroy();
          world.removeBody(object.physics);
          current.splice(id, 1);
        }
      });
    }
  };

  const buildPhysics = () => {
    world.setGlobalStiffness(1e4);
    world.setGlobalRelaxation(2);

    const groundBody = new p2.Body({
      mass: 0,
      position: [WIDTH / 2, -1 * (HEIGHT + 10)]
    });
    const groundShape = new p2.Box({
      width: WIDTH,
      height: 10
    });
    groundBody.addShape(groundShape);
    world.addBody(groundBody);

    groundShape.collisionGroup = GROUND;

    const leftBody = new p2.Body({
      mass: 0,
      position: [-10, -1 * (HEIGHT / 2)]
    });
    const leftShape = new p2.Box({
      width: 10,
      height: HEIGHT
    });
    leftBody.addShape(leftShape);
    world.addBody(leftBody);

    leftShape.collisionGroup = WALL;

    const rightBody = new p2.Body({
      mass: 0,
      position: [WIDTH + 10, -1 * (HEIGHT / 2)]
    });
    const rightShape = new p2.Box({
      width: 10,
      height: HEIGHT
    });
    rightBody.addShape(rightShape);
    world.addBody(rightBody);

    rightShape.collisionGroup = WALL;

    const topBody = new p2.Body({
      mass: 0,
      position: [WIDTH / 2, -10]
    });
    const topShape = new p2.Box({
      width: WIDTH,
      height: 10
    });
    topBody.addShape(topShape);
    world.addBody(topBody);

    topShape.collisionGroup = WALL;

    world.on('postStep', () => cleanup());
  };

  const buildStage = () => {
    stageRef.current.appendChild(pixiApp.view);
    pixiContainer.width = WIDTH;
    pixiContainer.height = HEIGHT;
    pixiApp.stage.addChild(pixiContainer);
  };

  useEffect(() => {
    if (connected && client) {
      client.onCommunitySub((_channel, _user, subInfo) => {
        handleSupport(calculateSubValue(subInfo.plan));
      });

      client.onResub((_channel, _user, subInfo) => {
        handleSupport(calculateSubValue(subInfo.plan));
      });

      client.onSubGift((_channel, _user, subInfo) => {
        handleSupport(calculateSubValue(subInfo.plan));
      });

      client.onSub((_channel, _user, subInfo) => {
        handleSupport(calculateSubValue(subInfo.plan));
      });

      client.onPrivmsg((_channel, _user, _message, msg) => {
        if (msg.emoteOffsets) {
          handleEmotes(msg.emoteOffsets);
        }
      });
    }
  }, [connected, client]);

  useEffect(() => {
    const emoteTexture = `${PUBLIC_URL}/sprites/emoteTexture.json`;
    loader.add(emoteTexture).load((loader, resources) => {
      textures.current = resources[emoteTexture].textures;
      buildPhysics();
      buildStage();
      requestAnimationFrame(animate);

      if (AUTO_SPAWN_FOR_TEST) {
        setTimeout(() => createObject(true, false), 3 * 1000);
      }
    });

    return () => {
      clearTimeout(hypeTimer.current);
    };
  }, []);

  return <Wrapper ref={stageRef} />;
}

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

export default Toy;
