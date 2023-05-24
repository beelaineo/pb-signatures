import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {CogIcon} from '@sanity/icons'
import {EarthGlobeIcon} from '@sanity/icons'
import {UserIcon} from '@sanity/icons'

const singletonActions = new Set(["publish", "discardChanges", "restore"])
const singletonTypes = new Set(["settings"])

export default defineConfig({
  name: 'default',
  title: 'Photobomb Email Signatures',

  projectId: 'k9f4bb0p',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Settings")
              .id("settings")
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType("settings")
                  .documentId("settings")
              ),
            S.documentTypeListItem("office").title("Locations").icon(EarthGlobeIcon),
            S.documentTypeListItem("person").title("Team").icon(UserIcon),
          ]),
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
