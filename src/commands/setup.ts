import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {
  ApplicationCommandOptionType,
  AutocompleteInteraction,
  ChannelType,
  CommandInteraction,
  EmbedBuilder,
  Emoji,
  MessagePayload,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class SetupBot {
  setupEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Getting started with the mining units!")
    .setURL("https://codex.madistouch.industries/")
    .setDescription("Some description here")
    .setThumbnail("https://i.imgur.com/AfFp7pu.png")
    .setImage("https://i.imgur.com/AfFp7pu.png")
    .setTimestamp()
    .setFooter({
      text: "Gulag Bot",
      iconURL: "https://i.imgur.com/AfFp7pu.png",
    });

  logEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Logging the mining units!")
    .setURL("https://codex.madistouch.industries/")
    .setDescription(
      "Here we will post logs of what is happening with the mining units for transparency"
    )
    .setThumbnail("https://i.imgur.com/AfFp7pu.png")
    .setImage("https://i.imgur.com/AfFp7pu.png")
    .setTimestamp()
    .setFooter({
      text: "Gulag Bot",
      iconURL: "https://i.imgur.com/AfFp7pu.png",
    });

  @Slash({ description: "Setup the bot", name: "setup" })
  async setup(interaction: CommandInteraction) {
    const thread = await interaction.guild?.channels.create({
      name: "Mining Tracker",
      type: ChannelType.GuildForum,
      topic: "This channel tracks the mining units calibration charges!",
      availableTags: [
        {
          name: "CALIBRATE!",
          moderated: true,
        },
        {
          name: "Soon™️",
          moderated: true,
        },
        {
          name: "Not Quite",
          moderated: true,
        },
        {
          name: "Calibrated",
          moderated: true,
        },
      ],
    });
    try {
      await prisma.settings.create({
        data: {
          serverId: String(interaction.guildId),
          setting: "tracker",
          value: String(thread?.id),
        },
      });
    } catch (e) {
      console.log(e);
    }
    // console.log(`Thread: ${thread?.id} Guild: ${thread?.guild.id}`);
    //TODO Set default reaction Emoji
    await thread?.threads.create({
      name: "🔰 Getting Started - Gulag Bot and You 🔰",
      autoArchiveDuration: 60,
      reason: "This is a channel for mining units ⛏️",
      message: {
        embeds: [this.setupEmbed],
      },
    });

    await thread?.threads.create({
      name: "📥 Gulag Bot - Logs",
      autoArchiveDuration: 60,
      reason: "This is a channel to log mining units ⛏️",
      message: {
        embeds: [this.logEmbed],
      },
    });

    // ...
  }

  //TODO Pin message to the top of forum
  //TODO Assign default permissions
  //TODO Create Guide message
}
