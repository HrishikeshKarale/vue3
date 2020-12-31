<template>
  <div class="markdown">
    <vue-textarea
      label="Markdown Text"
      :value="textValue"
      tag="task"
      placeholder="#head"
      :maxlength="maxlength"
      @alerts="alerts"
      @input="val => (textValue = val)"
    />
    <code>
      <div>
        <vueButton
          text="Markdown"
          tag="downloadMarkdownFile"
          category="small"
          icon="fas fa-file-download"
          :ctx="
            downloadToFile.bind(this, textValue, 'markdown.md', 'text/plain')
          "
        />
        <vue-clipboard id="copyHtml" :copy="markText" text="HTML" />
      </div>
      <span v-html="markText" />
    </code>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import vueButton from "@/components/button/vueButton.vue";
import vueClipboard from "@/components/code/vueClipboard.vue";
import vueTextarea from "@/components/form/vueTextarea.vue";
// import marked from "marked";

export default defineComponent({
  components: {
    vueButton,
    vueClipboard,
    vueTextarea
  },

  setup() {
    const textValue = ref(
      "Marked - Markdown Parser\n\
========================\n\
[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n\n\
Tags:\n\
-------------------\n\n\
1. create and download file\n\
2. clipboard implementation\n\
3. npm marked\n\n\
How To Use The Demo\n\
-------------------\n\n\
1. Type in stuff on the left.\n\
2. See the live updates on the right.\n\n\
That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:\n\n\
- **Preview:**  A live display of the generated HTML as it would render in a browser.\n\
- **HTML Source:**  The generated HTML before your browser makes it pretty.\n\
- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.\n\
- **Quick Reference:**  A brief run-down of how to format things using markdown.\n\n\
Why Markdown?\n\
-------------\n\n\
It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n\n\
> The overriding design goal for Markdown's\n\
> formatting syntax is to make it as readable\n\
> as possible. The idea is that a\n\
> Markdown-formatted document should be\n\
> publishable as-is, as plain text, without\n\
> looking like it's been marked up with tags\n\
> or formatting instructions.\n\n\
Ready to start writing?  Either start changing stuff on the left or\n\n\
[clear everything](/demo/?text=) with a simple click.\n\n\
[Marked]: https://github.com/markedjs/marked/\
[Markdown]: http://daringfireball.net/projects/markdown/"
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const marked = require("marked");
    const maxlength = 10000;

    const markText = computed(() => {
      return marked(textValue.value);
    });

    const downloadToFile = (
      content: string,
      filename: string,
      contentType: string
    ): void => {
      const a = document.createElement("a");
      const file = new Blob([content], { type: contentType });

      a.href = URL.createObjectURL(file);
      a.download = filename;
      a.click();

      URL.revokeObjectURL(a.href);
    };

    return { textValue, markText, maxlength, downloadToFile };
  }
});
</script>
<style lang="less">
@import (reference) "../../less/customMixins.less";
.markdown {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  & > div,
  & > code {
    width: 640px;
    min-height: 400px;
    flex: 1;
    margin: 32px;
  }
  & > code {
    background-color: #333;
    color: white;
    padding: 8px 32px;
    border-radius: 8px;
    position: relative;
    .scroll(640px);
    & > div {
      display: flex;
      justify-content: space-between;
      position: sticky;
      top: 0;
    }
  }
  & > div {
    width: 100%;
    & > div {
      max-width: 100% !important;
      max-height: 100% !important;
      & > textarea {
        max-width: 100% !important;
        min-height: 400px !important;
      }
    }
  }
}
</style>
