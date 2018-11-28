import React from 'react';
import styled from 'styled-components';

// Assets
import colors from '../../styles/colors';
import bookmarkIcon from '../../assets/image/bookmark.png';

// components
import CloseButton from '../button/Close';
import Image from '../container/Image';

const DetailItem = (props) => {
    const { site } = props;
    return (
        <SiteContainer>
            <Row href={site.url} target={'_blank'}>
                <Image
                    image={site.favIconUrl}
                    backupImage={bookmarkIcon}
                    alt={site.title}
                    width={'25px'}
                    height={'25px'}
                    padding={'0 4px'}
                />
                <div>
                    <Title>{site.title}</Title>
                </div>
                {site.content}
                <div style={{ marginLeft: 'auto' }}>
                    <CloseButton
                        display={true}
                        onClick={(e) => props.remove(e, site)}
                    />
                </div>
            </Row>
        </SiteContainer>
    );
};

export default DetailItem;

const SiteContainer = styled.div`
    box-sizing: border-box;
    border-bottom: 1px solid ${colors.darkWhite};
    padding: 0 3px 0 1px;
    width: 100%;
    :hover {
        z-index: 10;
        padding-left: 0px;
        border-left: 3px solid ${colors.babyBlue};
        box-shadow: 0 8px 3px -7px #777;
    }
`;

const Row = styled.a`
    width: 100%;
    box-sizing: border-box;
    padding: 0 1rem;
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    margin-left: .66rem;
    max-width: calc(100vw - 220px - 364px - 33px - 100px);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: .25rem 0;
`;