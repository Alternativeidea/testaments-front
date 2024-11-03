import './tiptap.css'

import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, List, ListOrdered, Redo, Strikethrough, TextQuote, Undo, WrapText } from 'lucide-react'

const MenuBar = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <>
            <div className='flex gap-2 justify-evenly border-b p-3 rounded-sm'>
                <div className='flex gap-2'>
                    <button
                        title='bold'
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()
                        }
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        <Bold/>
                    </button>
                    <button
                        title='italic'
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleItalic()
                                .run()
                        }
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        <Italic/>
                    </button>
                    <button
                        title='strike'
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleStrike()
                                .run()
                        }
                        className={editor.isActive('strike') ? 'is-active' : ''}
                    >
                        <Strikethrough/>
                    </button>
                </div>
                <div className='flex gap-2'>
                    <button
                        title='h1'
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >  <Heading1/>
                    </button>
                    <button
                        title='h2'
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        <Heading2/>
                    </button>
                    <button
                        title='h3'
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                    >
                        <Heading3/>
                    </button>
                    <button
                        title='h4'
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                    >
                        <Heading4/>
                    </button>
                    <button
                        title='h5'
                        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                    >
                        <Heading5/>
                    </button>
                    <button
                        title='h6'
                        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                    >
                        <Heading6/>
                    </button>
                </div>
                <div className='flex gap-2'>
                    <button
                        title='list'
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        <List/>
                    </button>
                    <button
                        title='ordered'
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                    >
                        <ListOrdered/>
                    </button>
                    <button
                        title='blockquote'
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editor.isActive('blockquote') ? 'is-active' : ''}
                    >
                        <TextQuote/>
                    </button>
                    <button title='hardbreak' onClick={() => editor.chain().focus().setHardBreak().run()}>
                        <WrapText/>
                    </button>
                </div>
                <div className='flex gap-2'>
                    <button
                        title='undo'
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .undo()
                                .run()
                        }
                    >
                        <Undo/>
                    </button>
                    <button
                        title='redo'
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .redo()
                                .run()
                        }
                    >
                        <Redo/>
                    </button>
                </div>
            </div>
        </>
    )
}

const extensions = [
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        }
    })
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

export default function Tiptap() {
    return (
        <div className='border rounded-sm'>
            <EditorProvider slotBefore={<MenuBar/>} extensions={extensions} content={content}></EditorProvider>
        </div>
    )
}
