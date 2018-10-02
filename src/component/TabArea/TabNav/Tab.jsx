import React from 'react'
import styled from 'styled-components'

import colors from '../../../styles/colors'

const UnselectedTab = styled.div`
    padding: .5rem;
    color: ${colors.gray};
    min-width: 4rem;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid ${colors.lightGray};
`

const SelectedTab = styled.div`
    background-color: ${colors.white};
    padding: .5rem;
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

const Tab = ({name, selected}) => {
    if(selected) {
        return <SelectedTab><Name>{name}</Name></SelectedTab>
    }
    return (
        <UnselectedTab><Name>{name}</Name></UnselectedTab>
    )
}

export default Tab