import { CommandInteraction, ApplicationCommandOptionType } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";

@Discord()
export class EditMining {
  @Slash({
    description: "Edit Mining Unit",
    name: "edit-unit",
  })
  edit(interaction: CommandInteraction): void {}
  iam(
    @SlashChoice({ name: "Human", value: "human" })
    @SlashChoice({ name: "Astronaut", value: "astronaut" })
    @SlashChoice({ name: "Dev", value: "dev" })
    @SlashOption({
      description: "What are you?",
      name: "what",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    what: string,

    @SlashChoice(10, 20, 30)
    @SlashOption({
      description: "fuel",
      name: "fuel",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    fuel: number,

    @SlashChoice("Patrol", "Diesel")
    @SlashOption({
      description: "type",
      name: "type",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    type: number,

    interaction: CommandInteraction
  ) {
    interaction.reply(`what: ${what}, fuel: ${fuel}, type: ${type}`);
  }
}
