import suneditor from "suneditor";
import SunEditor from "suneditor/src/lib/core";
import type { SunEditorOptions } from "suneditor/src/options";
import plugins from "suneditor/src/plugins";
import "suneditor/dist/css/suneditor.min.css";

export default function useSunEditor(
  idOrElement: MaybeRefOrGetter<string | HTMLElement>,
  options?: SunEditorOptions
) {
  const editor = ref<SunEditor>();
  const target = toValue(idOrElement);
  function reset(text?: string) {
    editor.value?.setContents(text ?? "Enter your message...");
  }

  onMounted(() => {
    editor.value = suneditor.create(
      target,
      options ?? {
        plugins: plugins,
        buttonList: [
          ["undo", "redo"],
          ["font", "fontSize", "formatBlock"],
          ["bold", "underline", "italic", "strike"],
          ["fontColor", "hiliteColor", "textStyle"],
          ["removeFormat"],
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "lineHeight"],
          ["table", "link" /**'image', 'video', 'audio'*/],
          ["fullScreen", "showBlocks", "codeView"],
          ["preview", "print"],
          ["save"],
        ],
        value: "Enter your message...",
        width: "100%",
        maxWidth: "100%",
        minWidth: "16rem",
        minHeight: "18rem",
      }
    );
  });

  onUnmounted(() => {
    editor.value = undefined;
  });

  return {
    editor: editor as Ref<SunEditor>,
    reset,
  };
}
