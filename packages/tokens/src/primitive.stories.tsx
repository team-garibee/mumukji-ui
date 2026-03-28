import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  color,
  spacing,
  fontSize,
  fontWeight,
  fontFamily,
  lineHeight,
  opacity,
  radius,
} from './primitives/primitive';

const meta: Meta = {
  title: 'Tokens/Primitive',
  tags: ['!autodocs'],
};

export default meta;

export const Color: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.entries(color).map(([groupName, shades]) => (
        <div key={groupName}>
          <p style={{ marginBottom: 8, fontWeight: 600 }}>{groupName}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {Object.entries(shades).map(([shade, value]) => (
              <div
                key={shade}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: value as string,
                    border: '1px solid #eee',
                  }}
                />
                <span style={{ fontSize: 11 }}>{shade}</span>
                <span style={{ fontSize: 10, color: '#888' }}>
                  {value as string}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Opacity</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(opacity).map(([key, value]) => (
            <div
              key={key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  background: '#F9603E',
                  opacity: value as number,
                }}
              />
              <span style={{ fontSize: 11 }}>{key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Spacing: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Object.entries(spacing).map(([key, value]) => (
        <div
          key={key}
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 32, fontSize: 12, color: '#888' }}>{key}</span>
          <div
            style={{
              height: 16,
              background: '#F9603E',
              borderRadius: 2,
              width: (value as number) * 2,
            }}
          />
          <span style={{ fontSize: 12 }}>{value}px</span>
        </div>
      ))}
    </div>
  ),
};

export const Typography: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Font Size</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Object.entries(fontSize).map(([key, value]) => (
            <div
              key={key}
              style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ width: 32, fontSize: 12, color: '#888' }}>
                {key}
              </span>
              <span
                style={{
                  fontSize: value as number,
                  fontFamily: fontFamily.default as string,
                }}>
                머먹지 디자인 시스템
              </span>
              <span style={{ fontSize: 11, color: '#888' }}>{value}px</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Font Weight</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {Object.entries(fontWeight).map(([key, value]) => (
            <span
              key={key}
              style={{ fontWeight: value as number, fontSize: 16 }}>
              {key} ({value})
            </span>
          ))}
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Font Family</p>
        <div style={{ display: 'flex', gap: 16 }}>
          {Object.entries(fontFamily).map(([key, value]) => (
            <span
              key={key}
              style={{ fontFamily: value as string, fontSize: 16 }}>
              {key}: {value as string}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Line Height</p>
        <div style={{ display: 'flex', gap: 16 }}>
          {Object.entries(lineHeight).map(([key, value]) => (
            <div
              key={key}
              style={{
                lineHeight: value as number,
                border: '1px solid #eee',
                padding: 8,
                width: 120,
              }}>
              <span style={{ fontSize: 12, color: '#888', display: 'block' }}>
                {key} ({value})
              </span>
              머먹지
              <br />
              디자인 시스템
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Radius: StoryObj = {
  render: () => (
    <div>
      <p style={{ marginBottom: 8, fontWeight: 600 }}>Radius</p>
      <div
        style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        {Object.entries(radius).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}>
            <div
              style={{
                width: 48,
                height: 48,
                background: '#F9603E',
                borderRadius: value as number,
              }}
            />
            <span style={{ fontSize: 11 }}>{key}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
