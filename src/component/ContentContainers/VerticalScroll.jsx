import styled from 'styled-components';

const VerticalScrollArea = styled.div`
    width: 100%;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    flex: 1;
    overflow-y: scroll;
    /* Force display scrollbar for osx */
    ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 7px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .5);
        -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
    }
    /* end */
`;

export default VerticalScrollArea;