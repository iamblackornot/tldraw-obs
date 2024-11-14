import { Box, Editor, Tldraw, TLShapeId } from 'tldraw'
import { useSyncDemo } from '@tldraw/sync'
import "tldraw/tldraw.css";

interface DrawBoardProps {
    hideUI?: boolean,
    fullscreen?: boolean,
    readOnly?: boolean,
}

const DrawBoard: React.FC<DrawBoardProps> = (props: DrawBoardProps) => {

    const store = useSyncDemo({ roomId: import.meta.env.VITE_ROOM_ID });

    let style: object = { position: 'fixed', inset: 0 };
    // if(props.readOnly) {
    //     style = { '--color-background': 'rgba(255, 255, 255, 0) !important', ...style }
    // }

	const handleMount = (editor: Editor) => {

        const id: TLShapeId = 'shape:captureFrame' as TLShapeId;
        const width = 1920;
        const height = 1080;
        const borderSize = 4;

        let shape = editor.getShape(id);

        if(!shape)
        {
        editor.createShape(
        {
            id: id,
            type: 'geo',
            isLocked: true,
            props: {
                w: width + borderSize,
                h: height + borderSize,
                color: 'green',
                fill: 'none',
                size: 's',
                labelColor: 'green',
            },
        }
        );

        shape = editor.getShape(id);
        }

        if(props.readOnly) {
            if(!props.fullscreen) {
                editor.select(id);
                editor.zoomToSelection();
            } else {
                editor.zoomToBounds(new Box(0, 0, width + borderSize, height + borderSize), {
                    animation: { duration: 500 },
                    inset: -borderSize,
                })
            }
        } else {
            editor.select(id);
            editor.zoomToSelection();
        }

        editor.updateInstanceState({ isReadonly: props.readOnly ? true : false });
	}

	return (
		<div style={style} className={props.readOnly ? 'tl-theme__dark--readonly' : ''}>
			<Tldraw
                inferDarkMode
                store={store} 
                hideUi={props.readOnly}
                onMount={handleMount} />
		</div>

    
	)
}

export default DrawBoard;