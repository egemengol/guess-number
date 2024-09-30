import { Field, ZkProgram } from "o1js";

export const SecretNumberProgram = ZkProgram({
  name: "secret-number",

  methods: {
    check: {
      privateInputs: [Field],

      async method(number: Field) {
        number.assertEquals(Field(42));
      },
    },
  },
});

export async function setupSecretNumberProgram() {
  // Compile the SecretNumberProgram
  await SecretNumberProgram.compile({ proofsEnabled: true });

  // Add the form to the container using innerHTML
  const container = document.querySelector<HTMLDivElement>(
    "#proofFormContainer",
  );
  if (container) {
    container.innerHTML = `
      <form id="proofForm">
        <input type="number" id="numberInput" placeholder="Enter a number" required />
        <button type="submit">Generate Proof</button>
      </form>
    `;

    // Add submit event listener to the form
    document
      .querySelector<HTMLFormElement>("#proofForm")!
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        const numberInput =
          document.querySelector<HTMLInputElement>("#numberInput")!;
        const number = parseInt(numberInput.value);
        try {
          console.log("start generating proof");
          const proof = await SecretNumberProgram.check(Field(number));
          console.log(proof.toJSON());
          console.log(JSON.stringify(proof.toJSON()));
          console.log("Proof generated:", proof);
          const proofResult =
            document.querySelector<HTMLDivElement>("#proofResult")!;
          proofResult.innerHTML = `Proof done for number ${number}`;
        } catch (error) {
          console.error("Error generating proof:", error);
        }
      });
  } else {
    console.error("Container not found");
  }
}
