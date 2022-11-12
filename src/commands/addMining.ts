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
      .setCustomId("AddForm");

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
  async AddForm(interaction: ModalSubmitInteraction): Promise<void> {
    const [unitName, posLoc] = ["unitField", "posField"].map((id) =>
      interaction.fields.getTextInputValue(id)
    );
    // This was easier than I thought!
    // This is the regex to test if the input matches the format
    // ::pos{0,2,1382.4872,7436.0897,-25766.423}
    const pos = new RegExp(
      /::pos\{([0-9\d]+),([0-9\d]+),([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?,([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?,([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?\}/g
    );
    // Try the position the user gave us
    try {
      //TODO Check if user has permission to add units.
      // If the position is true Create the entry
      if (pos.test(posLoc)) {
        await prisma.unit.create({
          data: {
            name: unitName,
            author: interaction.user.id,
            location: posLoc,
            serverId: String(interaction.guildId),
          },
        });
        await interaction.reply(
          `You have created **Unit Name:** \`${unitName}\`, **Position:** \`${posLoc}\``
        );
        //TODO Create a thread in unit channel
        //TODO Send message in channel
        //TODO Ask if Unit is calibrated
        //TODO Start timer on response
        //TODO Delete thread
      } else {
        await interaction.reply(
          `The **Position:** \`${posLoc}\` was not formatted correctly. \`::pos{0,2,1382.4872,7436.0897,-25766.423}\``
        );
      }
    } catch (e) {
      console.log(e);
    }
    return;
  }
}
