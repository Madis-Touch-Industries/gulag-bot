import {
	CommandInteraction,
	ApplicationCommandOptionType,
	AutocompleteInteraction,
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	ModalSubmitInteraction,
} from "discord.js";
import {
	Discord,
	ModalComponent,
	Slash,
	SlashChoice,
	SlashOption,
} from "discordx";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
@Discord()
export class EditMining {
	@Slash({
    description: "Edit Mining Unit",
    name: "edit-unit",
  })
	async edit(
		@SlashOption({
      autocomplete: async function (interaction: AutocompleteInteraction) {
        const units = (await getUnits(String(interaction.guildId))) || [];
        interaction.respond(
          units.map((unit) => ({
            name: unit.name,
            value: String(unit.id),
          }))
        );
      },
      description: "autocomplete",
      name: "autocomplete",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
		input: string,
		interaction: CommandInteraction,
	) {
		const unit = (await getUnit(input)) || { name: "ree", location: "ree" };
		console.log(unit);
		// Create the modal
		const modal = new ModalBuilder()
			.setTitle("Add Mining Unit")
			.setCustomId("EditForm");

		// Create text input fields
		const miningUnitInputComponent = new TextInputBuilder()
			.setCustomId("unitField")
			.setLabel("What is the name of the Field?")
			.setStyle(TextInputStyle.Short)
			.setRequired(true)
			.setValue(unit?.name);

		const posInputComponent = new TextInputBuilder()
			.setCustomId("posField")
			.setLabel("Write down the field `::pos{0,0,0,0,0}`")
			.setStyle(TextInputStyle.Short)
			.setRequired(true)
			.setValue(String(unit?.location));

		const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(
			miningUnitInputComponent,
		);

		const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(
			posInputComponent,
		);

		// Add action rows to form
		modal.addComponents(row1, row2);

		// --- snip ---

		// Present the modal to the user
		console.log(interaction.id);
		interaction.showModal(modal);
		console.log(interaction.id);
	}

	@ModalComponent()
	async EditForm(interaction: ModalSubmitInteraction): Promise<void> {
		const [unitName] = ["unitField"].map((id) =>
			interaction.fields.getTextInputValue(id),
		);

		await interaction.reply(`You have __**Edited**__ \`${unitName}\``);
		console.log(interaction.id);

		return;
	}
}

async function getUnits(server: string) {
	let units;
	try {
		units = await prisma.unit.findMany({
			where: {
				serverId: {
					equals: server,
				},
			},
		});
		return units;
	} catch (e) {
		console.log(e);
	}
}

async function getUnit(id: string) {
	let units;
	try {
		units = await prisma.unit.findFirst({
			where: {
				id: {
					equals: Number(id),
				},
			},
		});
		return units;
	} catch (e) {
		console.log(e);
	}
}

function showModal() {}
