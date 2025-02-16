import { Viewer } from '@photo-sphere-viewer/core';
import { GyroscopePlugin } from '@photo-sphere-viewer/gyroscope-plugin';

const urlParams = new URLSearchParams(window.location.search);
const pano = urlParams.get('url');

if (pano) {
    new Viewer({
        container: 'viewer',
        panorama: pano,
        plugins: [
            GyroscopePlugin,
        ],
        navbar: [
            {
                content: '<img src="cam.svg" alt="Download">',
                onClick(viewer) {
                    viewer.addEventListener('render', () => {
                        const link = document.createElement('a');
                        link.download = 'screenshot.png';
                        link.href = viewer.renderer.renderer.domElement.toDataURL();
                        link.click();
                    }, { once: true });
                    viewer.needsUpdate();
                },
            },
            'gyroscope',
            'fullscreen',
        ],
    });
} else {
    alert('Kein URL Parameter gefunden');
}