'use client';

import { useTheme } from 'next-themes';

export function Logo() {
  const { resolvedTheme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="119"
      height="22"
      fill="none"
      viewBox="0 0 119 22"
    >
      <g clipPath="url(#clip0_98_2)">
        <path
          fill={resolvedTheme === 'light' ? '#111111ef' : '#fffffff6'}
          d="M.876 8.163a3.014 3.014 0 00.003 4.252l7.676 7.703a2.988 2.988 0 004.236.003 3.014 3.014 0 00-.002-4.252l-1.59-1.595a.971.971 0 00-1.377-.001.98.98 0 000 1.382l1.617 1.622c.395.396.396 1.039.001 1.435a1.008 1.008 0 01-1.43-.001l-7.729-7.757a1.017 1.017 0 010-1.435 1.008 1.008 0 011.429 0l2.301 2.31a3.212 3.212 0 004.501.056l.512-.513c.41-.41 1.073-.41 1.483.001l2.38 2.39a2.988 2.988 0 004.237.002 3.014 3.014 0 00-.003-4.251L11.445 1.81C10.275.635 8.228.785 7.06 1.958 5.889 3.13 6.04 4.884 7.21 6.059l1.59 1.595a.971.971 0 001.377.001.98.98 0 000-1.381L8.56 4.652a1.017 1.017 0 01-.001-1.435 1.008 1.008 0 011.43 0l7.729 7.757c.395.397.395 1.04 0 1.435a1.008 1.008 0 01-1.429 0l-2.301-2.31h-.001a3.212 3.212 0 00-4.447-.002v-.001l-.512.513c-.41.41-1.073.41-1.483 0L5.112 8.165a2.988 2.988 0 00-4.236-.003z"
        ></path>
      </g>
      <path
        fill={resolvedTheme === 'light' ? '#111111ef' : '#fffffff6'}
        d="M27.138 17.5V4.41h2.767v5.4h5.62v-5.4h2.76V17.5h-2.76v-5.408h-5.62V17.5h-2.767zm16.178.185c-.626 0-1.185-.108-1.675-.326a2.696 2.696 0 01-1.163-.978c-.281-.434-.422-.976-.422-1.623 0-.546.1-1.004.3-1.374.2-.371.474-.67.819-.895a3.968 3.968 0 011.176-.512 8.949 8.949 0 011.393-.243c.571-.06 1.032-.115 1.381-.166.35-.055.603-.136.76-.243a.534.534 0 00.237-.473v-.038c0-.405-.128-.718-.383-.94-.252-.221-.61-.332-1.074-.332-.49 0-.88.109-1.17.326a1.5 1.5 0 00-.575.805L40.4 10.47c.128-.597.38-1.112.755-1.547a3.62 3.62 0 011.45-1.01c.597-.239 1.288-.358 2.072-.358.545 0 1.067.064 1.566.192.502.128.948.326 1.336.594.392.269.7.614.926 1.036.226.417.34.918.34 1.502V17.5h-2.583v-1.361h-.077a2.772 2.772 0 01-.633.811 2.93 2.93 0 01-.952.544c-.37.127-.8.191-1.285.191zm.78-1.879c.4 0 .754-.079 1.061-.236a1.88 1.88 0 00.722-.652c.175-.273.262-.582.262-.927v-1.042a1.46 1.46 0 01-.351.153 6.403 6.403 0 01-.492.122c-.184.034-.367.066-.55.096l-.499.07c-.32.047-.598.121-.837.224a1.34 1.34 0 00-.556.415c-.132.17-.198.384-.198.64 0 .37.134.653.402.85.273.191.618.287 1.036.287zm6.913 1.694V4.41h2.723V9.33h.083c.12-.264.292-.533.518-.805.23-.277.528-.508.895-.69.37-.188.83-.282 1.38-.282a3.69 3.69 0 011.982.562c.605.371 1.089.932 1.45 1.682.363.745.544 1.68.544 2.806 0 1.095-.177 2.02-.53 2.774-.35.75-.827 1.319-1.432 1.706-.601.384-1.274.576-2.02.576-.528 0-.978-.088-1.349-.262a2.788 2.788 0 01-.901-.659 3.342 3.342 0 01-.537-.811h-.121V17.5h-2.685zm2.665-4.91c0 .585.081 1.094.243 1.529.162.434.397.773.703 1.016.307.239.68.358 1.119.358.443 0 .818-.122 1.125-.364.307-.248.54-.588.697-1.023.162-.44.243-.944.243-1.515 0-.567-.08-1.065-.237-1.496-.158-.43-.39-.767-.697-1.01-.306-.243-.684-.364-1.131-.364-.443 0-.818.117-1.125.351-.303.235-.535.567-.697.998-.162.43-.243.937-.243 1.52zm8.727 4.91V7.682h2.723V17.5h-2.723zM63.77 6.416a1.48 1.48 0 01-1.042-.403 1.306 1.306 0 01-.428-.977c0-.375.143-.697.428-.966.29-.272.637-.409 1.042-.409s.75.137 1.036.41c.29.268.434.59.434.965 0 .379-.145.705-.434.977-.286.269-.631.403-1.036.403zm8.759 1.266v2.045h-5.913V7.682h5.913zm-4.57-2.352h2.722v9.153c0 .251.039.447.115.588a.634.634 0 00.32.288c.14.055.303.083.486.083.128 0 .255-.01.383-.032l.294-.058.429 2.027a7.67 7.67 0 01-.576.147 4.62 4.62 0 01-.9.108c-.657.026-1.232-.062-1.727-.262-.49-.2-.871-.511-1.144-.933-.273-.422-.407-.955-.403-1.598V5.33zm12.64 7.99V7.682h2.723V17.5h-2.615v-1.783h-.102a2.898 2.898 0 01-1.106 1.387c-.511.35-1.135.524-1.873.524-.656 0-1.233-.15-1.732-.448a3.076 3.076 0 01-1.17-1.272c-.277-.55-.417-1.208-.421-1.975V7.682h2.722v5.765c.005.58.16 1.038.467 1.375.307.336.718.505 1.234.505.328 0 .635-.075.92-.224.286-.153.516-.38.69-.678.18-.298.267-.667.263-1.105zm7.7 4.365c-.626 0-1.184-.108-1.674-.326a2.696 2.696 0 01-1.164-.978c-.28-.434-.421-.976-.421-1.623 0-.546.1-1.004.3-1.374.2-.371.473-.67.818-.895a3.97 3.97 0 011.176-.512 8.95 8.95 0 011.394-.243c.57-.06 1.031-.115 1.38-.166.35-.055.603-.136.761-.243a.534.534 0 00.237-.473v-.038c0-.405-.128-.718-.384-.94-.251-.221-.61-.332-1.074-.332-.49 0-.88.109-1.17.326a1.5 1.5 0 00-.575.805l-2.518-.204c.127-.597.379-1.112.754-1.547a3.62 3.62 0 011.451-1.01c.597-.239 1.287-.358 2.071-.358.545 0 1.068.064 1.566.192.503.128.948.326 1.336.594.392.269.701.614.927 1.036.226.417.339.918.339 1.502V17.5h-2.583v-1.361h-.077a2.772 2.772 0 01-.632.811 2.93 2.93 0 01-.953.544c-.37.127-.799.191-1.284.191zm.78-1.879c.4 0 .755-.079 1.061-.236a1.88 1.88 0 00.723-.652c.174-.273.262-.582.262-.927v-1.042a1.462 1.462 0 01-.352.153 6.403 6.403 0 01-.492.122c-.183.034-.367.066-.55.096l-.498.07c-.32.047-.599.121-.838.224a1.34 1.34 0 00-.556.415c-.132.17-.198.384-.198.64 0 .37.134.653.403.85.272.191.618.287 1.035.287zm12.084-8.124v2.045H95.25V7.682h5.912zm-4.57-2.352h2.723v9.153c0 .251.038.447.115.588a.635.635 0 00.32.288c.14.055.302.083.486.083.127 0 .255-.01.383-.032l.294-.058.428 2.027a7.63 7.63 0 01-.575.147c-.247.06-.547.095-.901.108-.656.026-1.232-.062-1.726-.262-.49-.2-.871-.511-1.144-.933-.273-.422-.407-.955-.403-1.598V5.33zm10.713 12.362c-1.01 0-1.879-.205-2.608-.614a4.203 4.203 0 01-1.674-1.751c-.392-.759-.589-1.656-.589-2.691 0-1.01.197-1.897.589-2.66a4.343 4.343 0 011.655-1.783c.716-.426 1.555-.639 2.519-.639.647 0 1.25.104 1.809.313a4.02 4.02 0 011.47.927c.422.413.75.933.984 1.56.234.622.352 1.35.352 2.186v.748h-8.291V11.6h5.727c0-.392-.085-.74-.255-1.042a1.834 1.834 0 00-.71-.71 2.022 2.022 0 00-1.042-.261c-.413 0-.78.096-1.099.287a2.02 2.02 0 00-.742.76c-.179.316-.27.668-.274 1.056v1.604c0 .486.089.906.268 1.26.183.353.441.626.773.817.333.192.727.288 1.183.288.303 0 .58-.043.831-.128s.467-.213.646-.383.315-.38.409-.627l2.518.166a3.443 3.443 0 01-.786 1.586c-.392.447-.899.797-1.521 1.048-.618.247-1.332.37-2.142.37z"
      ></path>
      <defs>
        <clipPath id="clip0_98_2">
          <rect
            width="20"
            height="20"
            y="1"
            fill={resolvedTheme === 'light' ? '#111111ef' : '#fffffff6'}
            rx="4"
          ></rect>
        </clipPath>
      </defs>
    </svg>
  );
}
