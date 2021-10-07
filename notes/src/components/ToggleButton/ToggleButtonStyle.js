import styled from 'styled-components';

export const ToggleLabelStyle = styled.label`
    position: relative;
`;

export const ToggleInput = styled.input`
    position: absolute;
    left: -9999px;
    top: -9999px;

    &:checked + span{
        background-color: #1890ff;

        &:before{
            left: calc(100%-5px);
            transform:translateX(100%);
        }
    }
    &:focus + span{
        box-shadow: 0 0 0 2px rgba(0,0,0,0.1)
    }
    &:focus:checked + span{
        box-shadow: 0 0 0 2px rgba(24,144,255,0.2)
    }
`;

export const ToggleSpan = styled.span`
    position: relative;
    display: block;
    cursor: pointer;
    width: 50px;
    height: 25px;
    border-radius: 100px;
    background-color: #bfbfbf;
    transition: background-color 0.2s, box-shadow 0.2s;
   &:before{
        position: absolute;
        content: '';
        background-color: #ffffff;
        left: 3px;
        top:2px;
        width: 21px;
        height: 21px;
        border-radius: 45px;
        transition: 0.2s;
        box-shadow: 0 2px 4px 0 rgba(0,35,11,0.2)
    }`;