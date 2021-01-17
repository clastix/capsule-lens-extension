import { Component } from '@k8slens/extensions';
import React from 'react';

export type Props = {
  name?: string;
  values?: string[];
  pairs?: [string, unknown][];
  dict?: Record<string, unknown>;
};

export const Labels: React.FC<Props> = props => {
  if (!props.values && !props.pairs && !props.dict)
    return null;

  const labels = <>
    {props.pairs && props.pairs.map(([key, value]) => (
      <Component.Badge key={key} label={`${key}=${value}`} />
    ))}
    {props.dict && Object.entries(props.dict).map(([key, value]) => (
      <Component.Badge key={key} label={`${key}=${value}`} />
    ))}
    {props.values && props.values.map(value => (
      <Component.Badge key={value} label={value} />
    ))}
  </>;

  if (props.name == null)
    return labels;

  return (
    <Component.DrawerItem labelsOnly name={props.name}>
      {labels}
    </Component.DrawerItem>
  );
};
