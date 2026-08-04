import FloatingBottle from "./FloatingBottle";
import Particles from "./Particles";
import Smoke from "./Smoke";
import FireSparks from "./FireSparks";
import IceCubes from "./IceCubes";

import bottlekf from "../assets/bottles/bottlekf.png";
import bottlers from "../assets/bottles/bottlers.png";
import bottlesula from "../assets/bottles/bottlesula.png";
import bottleib from "../assets/bottles/bottleib.png";
import bottle6 from "../assets/bottles/bottle6.png";
import bottle7 from "../assets/bottles/bottle7.png";
import bottle8 from "../assets/bottles/bottle8.png";
import bottle9 from "../assets/bottles/bottle9.png";
import bottle10 from "../assets/bottles/bottle10.png";

import smoke from "../assets/effects/smoke.png";
import light from "../assets/effects/light.png";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-black">

      {/* Background */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Effects */}
      <Smoke />
      <FireSparks />
      <IceCubes />
      <Particles />

      {/* Smoke */}
      <img
        src={smoke}
        alt=""
        className="absolute left-0 bottom-0 w-96 opacity-15 pointer-events-none"
      />

      <img
        src={smoke}
        alt=""
        className="absolute right-0 bottom-0 w-96 opacity-15 pointer-events-none"
      />
      {/* Light */}
      <img
        src={light}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-screen"
      />

      {/* Glow */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>

      {/* Bottles */}

      <FloatingBottle image={bottle6} top="12%" left="18%" width="90px" delay="1s" />
      <FloatingBottle image={bottle7} top="15%" right="18%" width="90px" delay="1.1s" />

      <FloatingBottle image={bottle8} top="35%" left="8%" width="100px" delay="1.2s" />
      <FloatingBottle image={bottle9} top="35%" right="8%" width="100px" delay="1.3s" />

      <FloatingBottle image={bottle10} top="58%" left="12%" width="95px" delay="1.4s" />
      <FloatingBottle image={bottlekf} top="58%" right="12%" width="95px" delay="1.5s" />

      <FloatingBottle image={bottlers} top="75%" left="22%" width="85px" delay="1.6s" />
      <FloatingBottle image={bottlesula} top="75%" right="22%" width="85px" delay="1.7s" />

      <FloatingBottle image={bottleib} top="48%" left="25%" width="75px" delay="1.8s" />
      <FloatingBottle image={bottle8} top="48%" right="25%" width="75px" delay="1.9s" />

      {/* Hero Content */}

      <div
        className="relative z-20 text-center px-6 max-w-2xl"
        style={{
          animation: "heroEntry 1s ease-out forwards",
        }}
      >
        <h1 className="text-6xl md:text-8xl font-extrabold text-yellow-400 drop-shadow-lg">
          Premium Spirits
        </h1>

        <p className="mt-6 text-lg md:text-2xl text-gray-300">
          Discover the finest collection of Whisky, Wine, Beer & Vodka.
        </p>

        <button className="mt-10 px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-all duration-300 hover:scale-110">
          Shop Now
        </button>
      </div>

    </section>
  );
}

export default Hero;