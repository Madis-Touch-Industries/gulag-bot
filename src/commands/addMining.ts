import { PrismaClient } from "@prisma/client";
import {
  CommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalSubmitInteraction,
} from "discord.js";
import { Discord, ModalComponent, Slash } from "discordx";
const prisma = new PrismaClient();
@Discord()
export class AddMining {
  @Slash({
    description: "Add Mining Unit",
    name: "add-unit",
  })
  modal(interaction: CommandInteraction): void {
    // Create the modal
    const modal = new ModalBuilder()
      .setTitle("Add Mining Unit")
      .setCustomId("MiningForm");

    // Create text input fields
    const miningUnitInputComponent = new TextInputBuilder()
      .setCustomId("unitField")
      .setLabel("What is the name of the Field?")
      .setStyle(TextInputStyle.Short);

    const posInputComponent = new TextInputBuilder()
      .setCustomId("posField")
      .setLabel("Write down the field `::pos{0,0,0,0,0}`")
      .setStyle(TextInputStyle.Short);

    const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(
      miningUnitInputComponent
    );

    const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(
      posInputComponent
    );

    // Add action rows to form
    modal.addComponents(row1, row2);

    // --- snip ---

    // Present the modal to the user
    interaction.showModal(modal);
  }

  @ModalComponent()
  async MiningForm(interaction: ModalSubmitInteraction): Promise<void> {
    const [unitName, posLoc] = ["unitField", "posField"].map((id) =>
      interaction.fields.getTextInputValue(id)
    );

    try {
      await prisma.unit.create({
        data: {
          name: unitName,
          author: "Snipey",
          location: posLoc,
        },
      });
    } catch (e) {
      console.log(e);
    }

    // await interaction.reply(`Unit Name: ${unitName}, Position: ${posLoc}`);

    return;
  }
}
