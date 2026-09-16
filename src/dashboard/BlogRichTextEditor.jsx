"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIIcon from "@mui/icons-material/StrikethroughS";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import CodeIcon from "@mui/icons-material/Code";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FormatClearIcon from "@mui/icons-material/FormatClear";

function ToolbarButton({
    onClick,
    active = false,
    disabled = false,
    title,
    children,
}) {
    return (
        <button
            type="button"
            className={`sb-editor-toolbar-btn ${
                active ? "is-active" : ""
            }`}
            onClick={onClick}
            disabled={disabled}
            title={title}
            aria-label={title}
        >
            {children}
        </button>
    );
}

export default function BlogRichTextEditor({
    value = "",
    onChange,
    placeholder = "Write your blog content here...",
}) {
    const editor = useEditor({
        immediatelyRender: false,

        extensions: [
    StarterKit.configure({
        heading: {
            levels: [1, 2, 3, 4],
        },
    }),

    TextAlign.configure({
        types: ["heading", "paragraph"],
    }),
],

        content: value || "<p></p>",

        editorProps: {
            attributes: {
                class: "sb-blog-editor-content",
            },
        },

        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(editor.getHTML());
            }
        },
    });

    /*
     * Keep editor synchronized with the value coming from
     * AddBlog.jsx or EditBlog.jsx.
     */
    useEffect(() => {
        if (!editor) return;

        const nextValue = value || "<p></p>";
        const currentValue = editor.getHTML();

        if (nextValue !== currentValue) {
            editor.commands.setContent(nextValue, {
                emitUpdate: false,
            });
        }
    }, [editor, value]);

    if (!editor) {
        return (
            <div className="sb-blog-rich-editor">
                <div className="sb-blog-editor-loading">
                    Loading editor...
                </div>
            </div>
        );
    }

    const addLink = () => {
        const previousUrl =
            editor.getAttributes("link").href || "";

        const url = window.prompt(
            "Enter the page URL or website URL:",
            previousUrl
        );

        if (url === null) {
            return;
        }

        const trimmedUrl = url.trim();

        if (!trimmedUrl) {
            editor.chain().focus().unsetLink().run();
            return;
        }

        /*
         * Internal links:
         * /services
         * /aboutus
         * /contact
         *
         * External links:
         * https://example.com
         */
        let finalUrl = trimmedUrl;

        if (
            !finalUrl.startsWith("/") &&
            !finalUrl.startsWith("#") &&
            !/^https?:\/\//i.test(finalUrl) &&
            !/^mailto:/i.test(finalUrl) &&
            !/^tel:/i.test(finalUrl)
        ) {
            finalUrl = `https://${finalUrl}`;
        }

        const openInNewTab = window.confirm(
            "Open this link in a new tab?"
        );

        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({
                href: finalUrl,
                target: openInNewTab ? "_blank" : "_self",
            })
            .run();
    };

    return (
        <div className="sb-blog-rich-editor">
            {/* Toolbar */}
            <div className="sb-editor-toolbar">
                {/* Text formatting */}
                <div className="sb-editor-toolbar-group">
                    <ToolbarButton
                        title="Bold"
                        active={editor.isActive("bold")}
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    >
                        <FormatBoldIcon />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Italic"
                        active={editor.isActive("italic")}
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                    >
                        <FormatItalicIcon />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Underline"
                        active={editor.isActive("underline")}
                        onClick={() =>
                            editor.chain().focus().toggleUnderline().run()
                        }
                    >
                        <FormatUnderlinedIcon />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Strikethrough"
                        active={editor.isActive("strike")}
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                    >
                        <StrikethroughSIIcon />
                    </ToolbarButton>
                </div>

                {/* Headings */}
                <div className="sb-editor-toolbar-group">
                    <select
                        className="sb-editor-heading-select"
                        value={
                            editor.isActive("heading", { level: 2 })
                                ? "h2"
                                : editor.isActive("heading", { level: 3 })
                                ? "h3"
                                : editor.isActive("heading", { level: 4 })
                                ? "h4"
                                : "paragraph"
                        }
                        onChange={(event) => {
                            const value = event.target.value;

                            if (value === "paragraph") {
                                editor
                                    .chain()
                                    .focus()
                                    .setParagraph()
                                    .run();

                                return;
                            }

                            const level = Number(
                                value.replace("h", "")
                            );

                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level })
                                .run();
                        }}
                        title="Text style"
                    >
                        <option value="paragraph">
                            Paragraph
                        </option>

                        <option value="h2">
                            Heading 2
                        </option>

                        <option value="h3">
                            Heading 3
                        </option>

                        <option value="h4">
                            Heading 4
                        </option>
                    </select>
                </div>

                {/* Lists */}
                <div className="sb-editor-toolbar-group">
                    <ToolbarButton
                        title="Bullet list"
                        active={editor.isActive("bulletList")}
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleBulletList()
                                .run()
                        }
                    >
                        <FormatListBulletedIcon />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Numbered list"
                        active={editor.isActive("orderedList")}
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleOrderedList()
                                .run()
                        }
                    >
                        <FormatListNumberedIcon />
                    </ToolbarButton>
                </div>

                {/* Alignment */}
                <div className="sb-editor-toolbar-group">
                    <ToolbarButton
                        title="Align left"
                        active={editor.isActive({
                            textAlign: "left",
                        })}
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setTextAlign("left")
                                .run()
                        }
                    >
                        <FormatAlignLeftIcon />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Align center"
                        active={editor.isActive({
                            textAlign: "center",
                        })}
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setTextAlign("center")
                                .run()
                        }
                    >
                        <FormatAlignCenterIcon />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Align right"
                        active={editor.isActive({
                            textAlign: "right",
                        })}
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setTextAlign("right")
                                .run()
                        }
                    >
                        <FormatAlignRightIcon />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Justify"
                        active={editor.isActive({
                            textAlign: "justify",
                        })}
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setTextAlign("justify")
                                .run()
                        }
                    >
                        <FormatAlignJustifyIcon />
                    </ToolbarButton>
                </div>

                {/* Links */}
                <div className="sb-editor-toolbar-group">
                    <ToolbarButton
                        title="Add or edit link"
                        active={editor.isActive("link")}
                        onClick={addLink}
                    >
                        <LinkIcon />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Remove link"
                        disabled={!editor.isActive("link")}
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .unsetLink()
                                .run()
                        }
                    >
                        <LinkOffIcon />
                    </ToolbarButton>
                </div>

                {/* Other formatting */}
                <div className="sb-editor-toolbar-group">
                    <ToolbarButton
                        title="Blockquote"
                        active={editor.isActive("blockquote")}
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleBlockquote()
                                .run()
                        }
                    >
                        <FormatQuoteIcon />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Code"
                        active={editor.isActive("code")}
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleCode()
                                .run()
                        }
                    >
                        <CodeIcon />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Horizontal line"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setHorizontalRule()
                                .run()
                        }
                    >
                        <HorizontalRuleIcon />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Clear formatting"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .clearNodes()
                                .unsetAllMarks()
                                .run()
                        }
                    >
                        <FormatClearIcon />
                    </ToolbarButton>
                </div>

                {/* History */}
                <div className="sb-editor-toolbar-group sb-editor-toolbar-history">
                    <ToolbarButton
                        title="Undo"
                        disabled={!editor.can().undo()}
                        onClick={() =>
                            editor.chain().focus().undo().run()
                        }
                    >
                        <UndoIcon />
                    </ToolbarButton>

                    <ToolbarButton
                        title="Redo"
                        disabled={!editor.can().redo()}
                        onClick={() =>
                            editor.chain().focus().redo().run()
                        }
                    >
                        <RedoIcon />
                    </ToolbarButton>
                </div>
            </div>

            {/* Editor */}
            <div className="sb-blog-editor-body">
                <EditorContent editor={editor} />

                {!editor.getText().trim() && (
                    <div className="sb-blog-editor-placeholder">
                        {placeholder}
                    </div>
                )}
            </div>
        </div>
    );
}