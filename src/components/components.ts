import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  CommandInteraction,
} from "discord.js";

export function showModal(
  title: string,
  id: string,
  interaction: CommandInteraction
) {
  // Create the modal
  const modal = new ModalBuilder().setTitle(title).setCustomId(id);

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
