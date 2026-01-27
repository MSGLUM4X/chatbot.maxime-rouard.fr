
const PreFilledInput = async (props:{ talkId: Promise<{ id: string }> }) => {
    const {id} = await props.talkId;
    return (
        <input type="hidden" name="talkId" value={id} readOnly/>
    )

}

export default PreFilledInput;