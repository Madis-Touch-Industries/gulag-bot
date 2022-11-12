import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  Interaction,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { ButtonComponent, Discord, Slash } from "discordx";

@Discord()
export class CalibrateUnit {
  // TODO

  @ButtonComponent({ id: "calibrate-derp" })
  handler(interaction: ButtonInteraction): void {
    interaction.reply(":wave:");
  }
  @ButtonComponent({ id: "calibrate-derp2" })
  handler2(interaction: ButtonInteraction): void {
    interaction.reply(":thumbsup:");
  }
  @ButtonComponent({ id: "calibrate-derp3" })
  handler3(interaction: ButtonInteraction): void {
    interaction.reply(":thumbsdown:");
  }
  @Slash({ description: "test" })
  test(interaction: CommandInteraction): void {
    const btn = new ButtonBuilder()
      .setLabel("Calibrate")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("calibrate-derp");
    const btn2 = new ButtonBuilder()
      .setLabel("Calibrate2")
      .setStyle(ButtonStyle.Success)
      .setCustomId("calibrate-derp2");
    const btn3 = new ButtonBuilder()
      .setLabel("Calibrate3")
      .setStyle(ButtonStyle.Danger)
      .setCustomId("calibrate-derp3");

    const buttonRow =
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        btn,
        btn2,
        btn3
      );

    interaction.reply({
      components: [buttonRow],
    });
  }
}
