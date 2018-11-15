import styled from 'styled-components';

// creates a verticle scroll Area
const VerticalScrollArea = styled.div`
    height: 100%;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-y: scroll;
    /* Force display scrollbar for osx */
    ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 7px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .5);
    }
    /* end */
`;

export default VerticalScrollArea;