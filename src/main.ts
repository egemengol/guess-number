import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupSecretNumberProgram } from "./secretNumberProgram";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h2>Guess the Number</h2>
    <p class="read-the-docs">
      Wait for the program to compile. Then try 42.
    </p>
    <div id="proofFormContainer"></div>
    <div id="proofResult"></div>
  </div>
`;

(async () => {
  console.log("compiling secret number program");
  await setupSecretNumberProgram();
  console.log("secret number program compiled");
})();
