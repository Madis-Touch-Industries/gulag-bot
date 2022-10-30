import {
  CommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
export class EditMining {
  @Slash({
    description: "Edit Mining Unit",
    name: "edit-unit",
  })
  hello(interaction: CommandInteraction): void {
    // Create the modal
    const modal = new ModalBuilder()
      .setTitle("Edit Mining Unit")
      .setCustomId("EditMiningForm");

    // Create text input fields
    const miningUnitInputComponent = new TextInputBuilder()
      .setCustomId("unitField")
      .setLabel("Wha is the name of the Field?")
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
}
