import React from 'react'
import styled from 'styled-components'

// Components
import RemoveButton from './RemoveButton'

// Styled
import colors from '../../../../styles/colors'

const UnselectedTab = styled.div`
    position: relative;
    padding: .5rem 1rem;
    color: ${colors.gray};
    min-width: 4rem;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid ${colors.lightGray};
    :hover{
        cursor: grab;
    }
`

const SelectedTab = styled.div`
    position: relative;
    background-color: ${colors.white};
    padding: .5rem 1rem;
    color: ${colors.babyBlue};
    min-width: 4rem;
    display: flex;
    justify-content: center;
    border-top: 3px solid ${colors.babyBlue};
    border-right: 1px solid ${colors.gray};
    border-left: 1px solid ${colors.lightGray};
    border-radius: 3px 3px 0 0;
`

const Name = styled.div`
`

const Tab = ({name, selected, editable}) => {
    if(selected) {
        return (
            <SelectedTab>
                <Name>{name}</Name>
                {editable? <RemoveButton/> : null}
            </SelectedTab>
        )
    }
    return (
        <UnselectedTab>
            <Name>{name}</Name>
            {editable? <RemoveButton/> : null}
        </UnselectedTab>
    )
}

export default Tab