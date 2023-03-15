const splitWords = () => {
  const textNode = document.querySelector(".text");
  const text = textNode.textContent;
  const newDomElements = text.split(" ").map((text) => {
    return `<span class="word">${text}</span>`;
  });
  textNode.innerHTML = newDomElements.join("");
};

const renderCanvas = () => {
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const World = Matter.World;
  const Bodies = Matter.Bodies;
  const Events = Matter.Events;

  // create a Matter.js engine
  const engine = Engine.create();

  // create a renderer
  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: 'transparent'
    }
  });

  // create a box that will act as a boundary for the falling words
  const boundary = Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight - 20,
    window.innerWidth,
    40,
    { isStatic: true }
  );

  // create the falling words
  const words = document.querySelectorAll(".word");
  const boxes = [];
  words.forEach((word) => {
    const box = Bodies.rectangle(
      Math.random() * window.innerWidth,
        Math.random() * -1000,
        word.clientWidth,
        word.clientHeight
      );
      boxes.push(box);
      word.style.left = box.position.x + "px";
      word.style.top = box.position.y + "px";
      word.addEventListener("mousedown", () => {
        word.classList.add("highlighted");
      });
      word.addEventListener("mouseup", () => {
        word.classList.remove("highlighted");
      });
    });

    // add all bodies to the world
    World.add(engine.world, [boundary, ...boxes]);

    // run the engine and renderer
    Engine.run(engine);
    Render.run(render);
  };

  // call the splitWords function on window load
  window.onload = splitWords;

  // call the renderCanvas function after a short timeout to make sure all the DOM elements have been rendered
  setTimeout(renderCanvas, 100);

