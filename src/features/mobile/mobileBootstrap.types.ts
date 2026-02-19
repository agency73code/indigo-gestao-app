export type BaseResponse = {
    terapeuta: {
        id: string;
        nome: string;
        email?: string | null;
        perfilAcesso?: string | null;
        atividade?: boolean | null;
        atualizadoEm?: string | null;
    };
    clientes: {
        id: string;
        nome?: string | null;
        status?: string | null;
        emailContato?: string | null;
        dataNascimento: string;
        avatarUrl?: string | null;
        atualizadoEm?: string | null;
    }[];
    areasAtuacao: {
        id: number;
        nome: string;
    }[];
    terapeutaClientes: {
        id: number;
        terapeutaId: string;
        clienteId: string;
        areaAtuacaoId: number;
        valorSessao: number;
        dataInicio: string;
        dataFim?: string | null;
        papel?: string | null;
        status?: string | null;
        criadoEm: string;
        atualizadoEm: string;
    }[];
};

export type ProgramasResponse = {
    ocps: {
        id: number;
        clienteId: string;
        terapeutaId: string;
        nomePrograma: string;
        area: string;
        status: string;
        dataInicio: string;
        dataFim: string;
        criadoEm: string;
        atualizadoEm: string;
    }[];
};

export type EstimulosResponse = {
    estimulos: {
        id: number;
        nome: string;
        descricao?: string | null;
        criadoEm: string;
        atualizadoEm: string;
    }[];
    estimuloOcps: {
        id: number;
        estimuloId: number;
        ocpId: number;
        nomeOverride?: string | null;
        descricao?: string | null;
        metodos?: string | null;
        tecnicasProcedimentos?: string | null;
        status: string | number;
        criadoEm: string;
        atualizadoEm: string;
    }[];
};

export type SessoesResponse = {
    sessoes: {
        id: number;
        ocpId: number;
        clienteId: string;
        terapeutaId: string;
        area: string;
        observacoesSessao?: string | null;
        dataCriacao: string;
        criadoEm: string;
        atualizadoEm: string;
    }[];
    sessaoTrials: {
        id: number;
        sessaoId: number;
        estimuloOcpId: number;
        ordem: number;
        resultado: string;
        duracaoMinutos?: number | null;
        utilizouCarga?: boolean | number | null;
        valorCarga?: number | null;
        teveDesconforto?: boolean | number | null;
        descricaoDesconforto?: string | null;
        teveCompensacao?: boolean | number | null;
        descricaoCompensacao?: string | null;
        participacao?: number | null;
        suporte?: number | null;
        criadoEm: string;
        atualizadoEm: string;
    }[];
    faturamentos: {
        id: number;
        sessaoId: number;
        clienteId: string;
        terapeutaId: string;
        inicioEm: string;
        fimEm: string;
        tipoAtendimento: string;
        status: string;
        ajudaCusto?: boolean | number | null;
        valorAjudaCusto?: number | null;
        observacaoFaturamento?: string | null;
        motivoRejeicao?: string | null;
        criadoEm: string;
        atualizadoEm: string;
    }[];
    sessaoArquivos?: {
        id: number;
        sessaoId: number;
        nome: string;
        caminho: string;
        tamanho: number;
        criadoEm: string;
        atualizadoEm: string;
    }[];
};

export type IdMaps = {
    ocpServerToLocal: Map<number, string>;
    estimuloServerToLocal: Map<number, string>;
    estimuloOcpServerToLocal: Map<number, string>;
    sessaoServerToLocal: Map<number, string>;
};